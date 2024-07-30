import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import compressVideo from '../utils/videoCompressor';
import { Request, Response, NextFunction } from 'express';
import cloudinaryConfigs from '../../config/cloudinary';

// Create an instance of CloudinaryStorage
cloudinary.config({
  cloud_name: cloudinaryConfigs.CLOUD_NAME,
  api_key: cloudinaryConfigs.CLOUD_API_KEY,
  api_secret: cloudinaryConfigs.CLOUD_API_SECRET,
  folder_name: cloudinaryConfigs.FOLDER_NAME,
  allowed_formats: ['jpeg', 'png', 'jpg', 'gif', 'mp4'],
  resource_type: 'auto'
})
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

// Multer configuration for handling file uploads
const upload = multer({ storage });

// Middleware function to handle video compression
const handleVideoCompression = async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
  next: NextFunction
) => {
  if (req?.file?.mimetype.startsWith('video/')) {
    const inputPath = req.file.path;
    const compressedPath = path.join('temp', `compressed_${req.file.filename}`);

    try {
      await compressVideo(inputPath, compressedPath);
      fs.unlinkSync(inputPath); // Remove the original file
      req.file.path = compressedPath; // Update the path to the compressed video
      next();
    } catch (err) {
      res.status(500).send('Error compressing video: ' + (err as Error).message);
    }
  } else {
    next();
  }
};

export { upload, handleVideoCompression };
