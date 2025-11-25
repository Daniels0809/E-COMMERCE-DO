import { NextResponse } from "next/server";
import { uploadImage } from "@/src/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Usa tu función que ya sube directo a Cloudinary
    const url = await uploadImage(file);

    return NextResponse.json({
      ok: true,
      url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Error uploading image" },
      { status: 500 }
    );
  }
}
