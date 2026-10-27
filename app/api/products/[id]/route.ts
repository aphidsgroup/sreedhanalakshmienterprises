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
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      slug,
      specification,
      unit,
      priceType,
      currentPrice,
      minPrice,
      maxPrice,
      priceNote,
      remarks,
      stockStatus,
      isFeatured,
      isActive,
      displayOrder,
      categoryId,
      brandId,
      imagePublicId,
      imageSecureUrl,
    } = body;

    const oldProduct = await prisma.product.findUnique({ where: { id } });
    if (!oldProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Build clean update object
    const updateData: any = {
      lastUpdated: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (specification !== undefined) updateData.specification = specification;
    if (unit !== undefined) updateData.unit = unit;
    if (priceType !== undefined) updateData.priceType = priceType;
    if (currentPrice !== undefined) updateData.currentPrice = currentPrice !== null && currentPrice !== "" ? Number(currentPrice) : null;
    if (minPrice !== undefined) updateData.minPrice = minPrice !== null && minPrice !== "" ? Number(minPrice) : null;
    if (maxPrice !== undefined) updateData.maxPrice = maxPrice !== null && maxPrice !== "" ? Number(maxPrice) : null;
    if (remarks !== undefined) updateData.remarks = remarks;
    if (stockStatus !== undefined) updateData.stockStatus = stockStatus;
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder || 0);

    if (categoryId) {
      updateData.category = { connect: { id: categoryId } };
    }
    if (brandId) {
      updateData.brand = { connect: { id: brandId } };
    } else if (brandId === null || brandId === "") {
      updateData.brand = { disconnect: true };
    }

    // Handle image update if provided
    if (imagePublicId && imageSecureUrl) {
      updateData.images = {
        deleteMany: {}, // Clear old images
        create: {
          publicId: imagePublicId,
          secureUrl: imageSecureUrl,
          isPrimary: true,
        },
      };
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    // Log price history if price changed
    const newPriceNum = currentPrice !== undefined && currentPrice !== null && currentPrice !== "" ? Number(currentPrice) : null;
    const oldPriceNum = oldProduct.currentPrice !== null ? Number(oldProduct.currentPrice) : null;
    if (newPriceNum !== null && newPriceNum !== oldPriceNum) {
      await prisma.priceHistory.create({
        data: {
          productId: id,
          price: newPriceNum,
          note: priceNote || "Price updated via Products CMS",
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/today-cement-price");
    revalidatePath("/today-steel-price");
    revalidatePath("/today-bricks-and-blocks-price");
    revalidatePath("/today-sand-and-aggregates-price");
    revalidatePath("/today-fabrication-materials-price");

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
