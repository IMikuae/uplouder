import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Pilih file terlebih dahulu!");

    setUploading(true);
const formData = new FormData();
formData.append("file", fileInput.files[0]);
    try {
      const res = await fetch("/api/upload", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((data) => console.log("Uploaded:", data))
  .catch((err) => console.error("Upload Error:", err));
      const data = await res.json();
      if (data.success) {
        setFileUrl(data.url);
      } else {
        alert("Upload gagal!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan!");
    }
    setUploading(false);
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#1e1e1e",
      color: "white",
      borderRadius: "10px"
    }}>
      <h1>Uploader ke Vercel</h1>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: "10px" }} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {uploading ? "Mengupload..." : "Upload"}
      </button>

      {fileUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>File berhasil diupload!</h3>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#4CAF50" }}>
            Lihat File
          </a>
        </div>
      )}
    </div>
  );
}
