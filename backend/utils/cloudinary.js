import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { config } from 'dotenv';
config(); // main debug beacuse env not loadedd here

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null


        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.secure_url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error("Error uploading file to cloudinary:", error);
        fs.unlinkSync(localFilePath) 
        return null;
    }
}



export {uploadOnCloudinary}