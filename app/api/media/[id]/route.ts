import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/cloudinary";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Find asset
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    await deleteImage(asset.publicId);

    // Delete from DB
    await prisma.mediaAsset.delete({ where: { id } });
    
    return NextResponse.json({ message: "Asset deleted" });
  } catch (error) {
    console.error("Failed to delete media asset:", error);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
