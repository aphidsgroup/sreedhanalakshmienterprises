import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "sde/general";
  const altText = formData.get("altText") as string;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await uploadImage(dataUri, folder);

  // Save to media library
  const asset = await prisma.mediaAsset.create({
    data: {
      publicId: result.publicId,
      secureUrl: result.secureUrl,
      altText,
      folder,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    },
  });

  return NextResponse.json(asset, { status: 201 });
}
