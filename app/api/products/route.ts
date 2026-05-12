import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const active = searchParams.get("active");

  const where: Record<string, unknown> = {};
  if (categorySlug) where.category = { slug: categorySlug };
  if (active !== null) where.isActive = active === "true";

  const products = await prisma.product.findMany({
    where,
    include: {
      category: { select: { name: true, slug: true } },
      brand: { select: { name: true } },
      images: { where: { isPrimary: true }, take: 1 },
    },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      specification: body.specification,
      unit: body.unit,
      currentPrice: body.currentPrice,
      remarks: body.remarks,
      categoryId: body.categoryId,
      brandId: body.brandId || null,
      isFeatured: body.isFeatured ?? false,
      isActive: body.isActive ?? true,
      lastUpdated: new Date(),
      ...(body.imagePublicId && body.imageSecureUrl
        ? {
            images: {
              create: {
                publicId: body.imagePublicId,
                secureUrl: body.imageSecureUrl,
                isPrimary: true,
              },
            },
          }
        : {}),
    },
    include: {
      images: true,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
