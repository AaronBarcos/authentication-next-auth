import { uploadCloud } from "../../../../lib/utils/cloudinaryConfig";
import dbConnect from "../../../../lib/db/index.js";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const formData = req.file;

  try {
    if (method === "POST") {
      uploadCloud.single("file")(req, res, async function (err) {
        if (formData) {
          return res
            .status(200)
            .json({ message: "Success", image: formData.path });
        }
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }
      });
    } else {
      return res.status(400).json({ message: "Invalid request method" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
