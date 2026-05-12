import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(assets);
  } catch (error) {
    console.error("Failed to fetch media assets:", error);
    return NextResponse.json({ error: "Failed to fetch media assets" }, { status: 500 });
  }
}
