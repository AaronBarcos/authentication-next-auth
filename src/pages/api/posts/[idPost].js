import dbConnect from "../../../../lib/db/index.js";
import Post from "../../../../lib/models/Post.model.js";

export default async function (req, res) {
  await dbConnect();

  const { method } = req;
  const { idPost } = req.query;

  try {
    if (method === "DELETE") {
      const post = await Post.findByIdAndDelete(idPost);
      return res
        .status(200)
        .json({ message: "Post deleted successfully", post });
    } else if (method === "PUT") {
      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }
      await Post.findByIdAndUpdate(idPost, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      return res.status(400).json({ message: "Invalid request method" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
