import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide your email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email",
        ],
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide your username"],
        minLength: [4, "Your username must be at least 4 characters long"],
        maxLength: [20, "Your username must be at most 20 characters long"],
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    friends : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
