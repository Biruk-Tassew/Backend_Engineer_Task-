import { Request, Response } from "express";
import { CreateAdGraphicInput, UpdateAdGraphicInput } from "../schema/adGraphic.schema";
import {
  createAdGraphic,
  deleteAdGraphic,
  findAndUpdateAdGraphic,
  findAdGraphic,
} from "../service/adGraphic.service";
import CloudinaryService from "../service/upload.service";
import compressVideo from "../utils/videoCompressor";

const cloudinaryService = new CloudinaryService();

export async function createAdGraphicHandler(req: Request, res: Response): Promise<Response> {
  try {
    if (!req?.file?.path) {
      return res.status(400).send('No file provided or file path is missing');
    }

    let filePath = req.file.path;

    // Check if the file is a video
    if (req.file.mimetype.startsWith('video/')) {
      // Compress the video
      filePath = await compressVideo(filePath);
    }

    // Upload the (possibly compressed) file to Cloudinary
    const fileUploadResult = await cloudinaryService.uploadFile(filePath);

    // Extract user ID from authenticated user
    const userId = res.locals.user._id;

    // Create the ad graphic record in the database
    const adGraphic = await createAdGraphic({
      userId: userId,
      adId: req.body.adId,
      fileName: fileUploadResult.public_id,
      fileType: req.file.mimetype || '',
      fileSize: req.file.size || 0,
      fileUrl: fileUploadResult.secure_url,
      uploadDate: new Date(),
    });

    return res.status(201).json(adGraphic);
  } catch (error: unknown) {
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error in createAdGraphicHandler:', errorMessage);
    return res.status(500).send(errorMessage);
  }
}

/**
 * Updates an existing ad graphic.
 * 
 * @param req - The Express request object, containing the ad graphic ID and update data.
 * @param res - The Express response object.
 */
export async function updateAdGraphicHandler(
  req: Request<UpdateAdGraphicInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const adGraphicId = req.params.id;
    const update = req.body;

    const adGraphic = await findAdGraphic({ _id: adGraphicId });

    if (!adGraphic) {
      return res.sendStatus(404);
    }

    if (String(adGraphic.userId) !== userId) {
      return res.sendStatus(403);
    }

    const updatedAdGraphic = await findAndUpdateAdGraphic({ _id: adGraphicId }, update, {
      new: true,
    });

    return res.send(updatedAdGraphic);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}

/**
 * Retrieves a specific ad graphic by ID.
 * 
 * @param req - The Express request object, containing the ad graphic ID.
 * @param res - The Express response object.
 */
export async function getAdGraphicHandler(
  req: Request<UpdateAdGraphicInput["params"]>,
  res: Response
) {
  try {
    const adGraphicId = req.params.id;
    const adGraphic = await findAdGraphic({ _id: adGraphicId });

    if (!adGraphic) {
      return res.sendStatus(404);
    }

    return res.send(adGraphic);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}

/**
 * Deletes a specific ad graphic by ID.
 * 
 * @param req - The Express request object, containing the ad graphic ID.
 * @param res - The Express response object.
 */
export async function deleteAdGraphicHandler(
  req: Request<UpdateAdGraphicInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const adGraphicId = req.params.id;

    const adGraphic = await findAdGraphic({ _id: adGraphicId });

    if (!adGraphic) {
      return res.sendStatus(404);
    }

    if (String(adGraphic.userId) !== userId) {
      return res.sendStatus(403);
    }

    await deleteAdGraphic( adGraphicId );

    return res.sendStatus(200);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}
