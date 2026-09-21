import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
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

    // Attempt to write to public/uploads if filesystem is writable
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
      });
    } catch {
      // If filesystem is read-only (e.g. Vercel serverless), fall back to base64 Data URL
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        name: filename,
        size: file.size,
        mediaType,
      });
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
