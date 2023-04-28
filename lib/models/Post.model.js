import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);