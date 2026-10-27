import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, icon, imageUrl, sortOrder, isActive } = body;

    const category = await prisma.category.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/ /g, "-"),
        description: description || null,
        icon: icon || null,
        imageUrl: imageUrl || null,
        sortOrder: Number(sortOrder || 0),
        isActive: Boolean(isActive ?? true),
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create category:", error);
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 500 });
  }
}
