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
  const { imagePublicId, imageSecureUrl, currentPrice, priceNote, ...restBody } = body;
  const oldProduct = await prisma.product.findUnique({ where: { id } });
  
  // Handle image update if provided
  const imageUpdate = imagePublicId && imageSecureUrl ? {
    images: {
      deleteMany: {}, // Clear old images
      create: {
        publicId: imagePublicId,
        secureUrl: imageSecureUrl,
        isPrimary: true,
      }
    }
  } : {};

  const product = await prisma.product.update({
    where: { id },
    data: { ...restBody, currentPrice, ...imageUpdate, lastUpdated: new Date() },
  });
  // Log price history if price changed
  if (currentPrice !== undefined && oldProduct?.currentPrice !== currentPrice) {
    await prisma.priceHistory.create({
      data: {
        productId: id,
        price: currentPrice,
        note: priceNote || "Price updated",
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
