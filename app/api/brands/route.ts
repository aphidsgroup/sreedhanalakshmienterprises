import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const brands = await prisma.brand.findMany({
    where: categoryId ? { categoryId } : {},
    include: { category: { select: { name: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(brands);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, logoUrl, description, isActive, sortOrder, categoryId } = body;

    const brand = await prisma.brand.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/ /g, "-"),
        logoUrl: logoUrl || null,
        description: description || null,
        isActive: Boolean(isActive ?? true),
        sortOrder: Number(sortOrder || 0),
        category: { connect: { id: categoryId } },
      },
    });
    return NextResponse.json(brand, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create brand:", error);
    return NextResponse.json({ error: error.message || "Failed to create brand" }, { status: 500 });
  }
}
