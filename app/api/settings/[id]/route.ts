import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { key, value, label, type } = body;

    const updateData: any = {};
    if (key !== undefined) updateData.key = key;
    if (value !== undefined) updateData.value = value;
    if (label !== undefined) updateData.label = label;
    if (type !== undefined) updateData.type = type;

    const setting = await prisma.settings.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(setting);
  } catch (error: any) {
    console.error("Failed to update setting:", error);
    return NextResponse.json({ error: error.message || "Failed to update setting" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.settings.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Setting deleted" });
  } catch (error) {
    console.error("Failed to delete setting:", error);
    return NextResponse.json({ error: "Failed to delete setting" }, { status: 500 });
  }
}
