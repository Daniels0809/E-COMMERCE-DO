import { v2 as cloudinary } from "cloudinary";

const {
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = process.env;

let isConfigured = false;

// Configure Cloudinary once
function ensureConfig() {
  if (
    !CLOUDINARY_NAME ||
    !CLOUDINARY_KEY ||
    !CLOUDINARY_SECRET
  ) {
    throw new Error(
      "Missing Cloudinary environment variables. Check CLOUDINARY_NAME, CLOUDINARY_KEY and CLOUDINARY_SECRET."
    );
  }

  if (!isConfigured) {
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET,
      secure: true,
    });

    isConfigured = true;
  }
}

/**
 * Uploads any Blob (File or Blob) to Cloudinary and returns the secure_url
 */
export async function uploadImage(file: Blob): Promise<string> {
  ensureConfig();

  if (!file) throw new Error("No file provided");
  
  // Convert Blob to Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER ?? "homedecor",
        transformation: [
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}

export default cloudinary;
