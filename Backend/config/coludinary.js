import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_API_KEY,
    api_secret: process.env.Cloudinary_API_SECRET,
    secure: true,
});

export default cloudinary;
