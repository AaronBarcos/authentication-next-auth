import dbConnect from "../../../../lib/db/index.js";
import Post from "../../../../lib/models/Post.model.js";

export default async function (req, res) {
  await dbConnect();

  const { method } = req;

  try {
    if (method === "GET") {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ message: "Success", posts });
    } else if (method === "POST") {
      const { title, image, content, author } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content fields are required" });
      } else {
        const post = await Post.create({
          title,
          image,
          content,
          author
        });
        return res
          .status(200)
          .json({ message: "Post created successfully", post });
      }
    } else {
      return res.status(400).json({ message: "Invalid request method" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
