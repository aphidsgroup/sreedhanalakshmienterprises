import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.settings.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const setting = await prisma.settings.create({ data: body });
    return NextResponse.json(setting, { status: 201 });
  } catch (error) {
    console.error("Failed to create setting:", error);
    return NextResponse.json({ error: "Failed to create setting" }, { status: 500 });
  }
}
