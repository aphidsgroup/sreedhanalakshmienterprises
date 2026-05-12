import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const enquiry = await prisma.enquiry.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      message: body.message || null,
      product: body.product || null,
      quantity: body.quantity || null,
      branch: body.branch || null,
    },
  });
  return NextResponse.json(enquiry, { status: 201 });
}

export async function GET() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(enquiries);
}
