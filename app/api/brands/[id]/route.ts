import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const brand = await prisma.brand.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.error("Failed to update brand:", error);
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.brand.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Brand deleted" });
  } catch (error) {
    console.error("Failed to delete brand:", error);
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}
