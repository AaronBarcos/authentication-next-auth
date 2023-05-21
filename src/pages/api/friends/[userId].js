import dbConnect from "../../../../lib/db/index.js";
import User from "../../../../lib/models/User.model.js";

export default async function (req, res) {
  await dbConnect();

  const { method } = req;
  const { userId } = req.query;

  switch (method) {
    case "GET":
      try {
        const friends = await User.findById(userId).select("friends");
        res.status(200).json({ success: true, friends });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    case "POST":
        try {
            const { friendId } = req.body;
            const user = await User.findById(userId);
    
            if (!user.friends.includes(friendId)) {
                user.friends.push(friendId);
                await user.save();
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false });
            }
            }
            catch (error) {
                res.status(400).json({ success: false });
            }
        break;
  }
}
