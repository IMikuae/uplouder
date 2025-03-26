import formidable from "formidable";
import { put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Matikan bodyParser agar bisa menerima FormData
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1️⃣ Parsing FormData menggunakan formidable
    const form = new formidable.IncomingForm();
    const [fields, files] = await form.parse(req);

    if (!files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = files.file[0]; // Ambil file pertama
    const fileBuffer = await fs.readFile(file.filepath); // Baca file sebagai buffer

    // 2️⃣ Upload ke Vercel Blob Storage
    const blob = await put(file.originalFilename, fileBuffer, {
      access: "public", // Pastikan bisa diakses secara publik
    });

    return res.status(200).json({
      success: true,
      fileUrl: blob.url, // ✅ URL hasil upload
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
}
