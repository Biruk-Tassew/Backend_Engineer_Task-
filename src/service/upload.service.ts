// src/services/CloudinaryService.ts
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { ConfigOptions } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
      folder: process.env.FOLDER_NAME,
    });
  }
  
  public async uploadFile(filePath: string): Promise<UploadApiResponse> {
    console.log(process.env.CLOUDINARY_API_KEY)
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',
      });
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }
}

export default CloudinaryService;
