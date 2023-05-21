import dbConnect from "../../../../lib/db/index.js";
import User from "../../../../lib/models/User.model.js";
import { useSession } from "next-auth/react";

export default async function (req, res) {
  await dbConnect();

  const { method } = req;

  try {
    if (method === "GET") {
      const { user } = req.query;
      const users = await User.find({
        username: { $regex: user, $options: "i" },
      }).sort({ createdAt: -1 });
      return res.status(200).json({ message: "Success", users });
    } else {
      return res.status(400).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
