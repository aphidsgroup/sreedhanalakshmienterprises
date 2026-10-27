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
    const { key, value, label, type } = body;

    const setting = await prisma.settings.create({
      data: {
        key: key.toUpperCase().replace(/ /g, "_"),
        value: String(value || ""),
        label: label || null,
        type: type || "text",
      },
    });
    return NextResponse.json(setting, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create setting:", error);
    return NextResponse.json({ error: error.message || "Failed to create setting" }, { status: 500 });
  }
}
