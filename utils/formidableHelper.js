import formidable from "formidable";

export function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false }); // Hanya satu file yang diunggah
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
