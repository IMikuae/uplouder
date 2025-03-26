import formidable from "formidable";

export function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}

// Konfigurasi Next.js untuk mematikan bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};
