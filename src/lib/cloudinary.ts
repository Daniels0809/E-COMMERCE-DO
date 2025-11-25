import { v2 as cloudinary } from "cloudinary";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

let isConfigured = false;

// Ensure Cloudinary is configured
function ensureConfig() {
  if (
    !CLOUDINARY_CLOUD_NAME ||
    !CLOUDINARY_API_KEY ||
    !CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      "Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env"
    );
  }

  if (!isConfigured) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });
    isConfigured = true;
  }
}

// Upload image to Cloudinary
export async function uploadImageToCloudinary(file: File) {
  ensureConfig();

  if (!file || file.size === 0) {
    throw new Error("You must attach an image for the product.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
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
            reject(error ?? new Error("Unknown error uploading image"));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      uploadStream.end(buffer);
    }
  );
}

// Compatibility function: returns only URL
export async function uploadImage(file: File | Blob): Promise<string> {
  if (!(file instanceof File)) {
    throw new Error("uploadImage only accepts File objects");
  }

  const result = await uploadImageToCloudinary(file);
  return result.secure_url;
}

export default cloudinary;
