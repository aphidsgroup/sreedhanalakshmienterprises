import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadImage(
  file: string,
  folder: string = "sde/general"
) {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
  });
  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
