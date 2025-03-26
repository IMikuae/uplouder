import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Pilih file terlebih dahulu!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFileUrl(data.fileUrl);
      } else {
        alert("Upload gagal!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengupload!");
    }

    setUploading(false);
  };

  return (
    <div className="container">
      <h1>Upload File ke Vercel</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {fileUrl && (
        <p>
          ✅ File berhasil diupload: <a href={fileUrl} target="_blank">{fileUrl}</a>
        </p>
      )}
    </div>
  );
}
