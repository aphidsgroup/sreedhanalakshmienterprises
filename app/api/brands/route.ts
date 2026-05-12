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
  const body = await req.json();
  const brand = await prisma.brand.create({ data: body });
  return NextResponse.json(brand, { status: 201 });
}
