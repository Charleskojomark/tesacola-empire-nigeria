import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role === "CUSTOMER") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = file.name || "upload";
    const mimeType = file.type || "application/octet-stream";
    const isVideo =
      mimeType.startsWith("video/") ||
      /\.(mp4|webm|mov|ogg)$/i.test(filename);
    const mediaType: "IMAGE" | "VIDEO" = isVideo ? "VIDEO" : "IMAGE";

    // 1. Primary Strategy: Upload directly to Cloudinary
    try {
      const cloudinaryResult = await uploadToCloudinary(buffer, {
        filename,
        isVideo,
        folder: "tesacola/products",
      });

      return NextResponse.json({
        success: true,
        url: cloudinaryResult.url,
        name: filename,
        size: cloudinaryResult.bytes || file.size,
        mediaType,
        provider: "CLOUDINARY",
        publicId: cloudinaryResult.publicId,
      });
    } catch (cloudErr: any) {
      console.warn(
        "Cloudinary upload failed, falling back to local/data storage. Detail:",
        cloudErr?.message || cloudErr
      );

      // 2. Secondary Strategy: Write to public/uploads if filesystem is writable
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadDir, safeName);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
          success: true,
          url: `/uploads/${safeName}`,
          name: filename,
          size: file.size,
          mediaType,
          provider: "LOCAL",
        });
      } catch {
        // 3. Fallback: Base64 Data URL (serverless portability)
        const base64 = buffer.toString("base64");
        const dataUrl = `data:${mimeType};base64,${base64}`;

        return NextResponse.json({
          success: true,
          url: dataUrl,
          name: filename,
          size: file.size,
          mediaType,
          provider: "DATA_URL",
        });
      }
    }
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
