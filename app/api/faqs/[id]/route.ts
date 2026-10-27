import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { question, answer, page, sortOrder, isActive, categoryId } = body;

    const updateData: any = {};
    if (question !== undefined) updateData.question = question;
    if (answer !== undefined) updateData.answer = answer;
    if (page !== undefined) updateData.page = page;
    if (sortOrder !== undefined) updateData.sortOrder = Number(sortOrder || 0);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    if (categoryId) {
      updateData.category = { connect: { id: categoryId } };
    } else if (categoryId === null) {
      updateData.category = { disconnect: true };
    }

    const faq = await prisma.fAQ.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(faq);
  } catch (error: any) {
    console.error("Failed to update FAQ:", error);
    return NextResponse.json({ error: error.message || "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.fAQ.delete({
      where: { id },
    });
    return NextResponse.json({ message: "FAQ deleted" });
  } catch (error) {
    console.error("Failed to delete FAQ:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
