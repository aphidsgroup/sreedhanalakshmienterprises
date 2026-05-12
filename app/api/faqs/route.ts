import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { sortOrder: "asc" },
      include: { category: { select: { name: true } } },
    });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const faq = await prisma.fAQ.create({ data: body });
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("Failed to create FAQ:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
