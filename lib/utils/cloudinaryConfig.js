const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Cloudinary configuration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Multer configuration

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "posts",
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;



