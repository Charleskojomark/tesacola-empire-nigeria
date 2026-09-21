import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure Cloudinary with environment variables or provided credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dtopla0ls",
  api_key: process.env.CLOUDINARY_API_KEY || "485459296488819",
  api_secret: process.env.CLOUDINARY_API_SECRET || "ssVQnex-xNfUyZBBuw7ZrL9s8qM",
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format?: string;
  bytes?: number;
  mediaType: "IMAGE" | "VIDEO";
}

/**
 * Uploads a buffer (image or video) directly to Cloudinary.
 * Handles automatic resource detection, folder organization, and CDN delivery.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    filename?: string;
    isVideo?: boolean;
    folder?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  const isVideo = !!options.isVideo;
  const resourceType = isVideo ? "video" : "image";
  const folder = options.folder || "tesacola/products";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        overwrite: false,
        use_filename: true,
        unique_filename: true,
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error("Cloudinary upload stream error:", error);
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary returned empty result"));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes,
          mediaType: isVideo ? "VIDEO" : "IMAGE",
        });
      }
    );

    uploadStream.end(buffer);
  });
}

export { cloudinary };
