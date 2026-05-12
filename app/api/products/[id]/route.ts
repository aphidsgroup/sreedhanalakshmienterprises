import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      brand: true,
      images: true,
      priceHistory: { orderBy: { effectiveDate: "desc" }, take: 10 },
    },
  });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const oldProduct = await prisma.product.findUnique({ where: { id } });
  const product = await prisma.product.update({
    where: { id },
    data: { ...body, lastUpdated: new Date() },
  });
  // Log price history if price changed
  if (body.currentPrice && oldProduct?.currentPrice !== body.currentPrice) {
    await prisma.priceHistory.create({
      data: {
        productId: id,
        price: body.currentPrice,
        note: body.priceNote || "Price updated",
      },
    });
  }
  revalidatePath("/");
  revalidatePath(`/today-cement-price`);
  revalidatePath(`/today-steel-price`);
  revalidatePath(`/today-bricks-and-blocks-price`);
  revalidatePath(`/today-sand-and-aggregates-price`);
  return NextResponse.json(product);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
