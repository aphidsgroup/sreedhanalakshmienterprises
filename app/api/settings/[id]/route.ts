import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const setting = await prisma.settings.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(setting);
  } catch (error) {
    console.error("Failed to update setting:", error);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.settings.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Setting deleted" });
  } catch (error) {
    console.error("Failed to delete setting:", error);
    return NextResponse.json({ error: "Failed to delete setting" }, { status: 500 });
  }
}
