import dbConnect from "../../../../lib/db/index.js";
import User from "../../../../lib/models/User.model.js";

export default async function (req, res) {
  await dbConnect();

  const { method } = req;
  const { username } = req.query;

  try {
    if (method === "GET") {
      const users = await User.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ message: "Success", users });
    } else {
      return res.status(400).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}