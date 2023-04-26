const { hash } = require("bcryptjs");
import dbConnect from "../../../../lib/db/index.js";
import User from "../../../../lib/models/User.model.js";

const handler = async (req, res) => {
  await dbConnect();

  const { method } = req;

  if (method === "POST") {
    if (!req.body) return res.status(400).json({ message: "Data is missing" });

    const { email, username, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      } else if (!email || !username || !password) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      } else {
        const hashedPassword = await hash(password, 12);
        const user = await User.create({
          email,
          username,
          password: hashedPassword,
        });
        return res
          .status(200)
          .json({ message: "User created successfully", user });
      }
    }
  } else {
    return res.status(400).json({ message: "Invalid request method" });
  }
};

export default handler;
