import { parseForm } from "../utils/formidableHelper";
import { put } from "../vercel/blob";

export const config = {
  api: {
    bodyParser: false, // Matikan bodyParser bawaan Next.js agar bisa menangani file upload
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { files } = await parseForm(req);

    if (!files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = files.file[0]; // Ambil file pertama
    const fileBuffer = await file.toBuffer();

    // Simpan file ke Vercel Blob Storage
    const { url } = await put(file.originalFilename, fileBuffer, {
      access: "public", // File bisa diakses secara publik
    });

    res.status(200).json({ success: true, url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}
