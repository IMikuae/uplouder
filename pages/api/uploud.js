import { put } from "@vercel/blob";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Matikan bodyParser agar formidable bisa bekerja
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Gunakan formidable untuk parsing file
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "File parsing error" });
      }

      // Ambil file pertama yang di-upload
      const file = files.file[0]; // Formidable v2 menyimpan file dalam array

      // Upload ke Vercel Blob Storage
      const blob = await put(file.originalFilename, file.filepath, {
        access: "public", // File bisa diakses secara publik
      });

      return res.status(200).json({ success: true, url: blob.url });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}
