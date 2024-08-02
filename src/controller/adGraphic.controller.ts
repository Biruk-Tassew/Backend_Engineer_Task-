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
import { createResponse } from "../utils/response"; 

const cloudinaryService = new CloudinaryService();

export async function createAdGraphicHandler(req: Request, res: Response): Promise<Response> {
  try {
    if (!req?.file?.path) {
      return res.status(400).json(createResponse(false, 'No file provided or file path is missing', null));
    }

    let filePath = req.file.path;
    const videoCompressionLevel = Number(req.body.videoCompressionLevel) || 0;

    if (req.file.mimetype.startsWith('video/')) {
      filePath = await compressVideo(filePath, videoCompressionLevel);
    }

    const fileUploadResult = await cloudinaryService.uploadFile(filePath);
    const userId = res.locals.user._id;

    const adGraphic = await createAdGraphic({
      userId: userId,
      adId: req.body.adId,
      fileName: req.body.fileName || fileUploadResult.public_id,
      fileType: req.file.mimetype || '',
      fileSize: req.file.size || 0,
      fileUrl: fileUploadResult.secure_url,
      uploadDate: new Date(),
    });

    return res.status(201).json(createResponse(true, 'Ad graphic created successfully', adGraphic));
  } catch (error: unknown) {
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error in createAdGraphicHandler:', errorMessage);
    return res.status(500).json(createResponse(false, errorMessage, null, error));
  }
}

export async function updateAdGraphicHandler(
  req: Request<UpdateAdGraphicInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const adGraphicId = req.params.id;
    const update = req.body;

    const adGraphic = await findAdGraphic({ _id: adGraphicId });

    if (!adGraphic) {
      return res.status(404).json(createResponse(false, 'Ad graphic not found', null));
    }

    if (String(adGraphic.userId) !== userId) {
      return res.status(403).json(createResponse(false, 'Forbidden', null));
    }

    const updatedAdGraphic = await findAndUpdateAdGraphic({ _id: adGraphicId }, update, {
      new: true,
    });

    return res.json(createResponse(true, 'Ad graphic updated successfully', updatedAdGraphic));
  } catch (error: unknown) {
    console.error('Error in updateAdGraphicHandler:', error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}

export async function getAdGraphicHandler(
  req: Request<UpdateAdGraphicInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const adGraphicId = req.params.id;
    const adGraphic = await findAdGraphic({ _id: adGraphicId });

    if (!adGraphic) {
      return res.status(404).json(createResponse(false, 'Ad graphic not found', null));
    }

    return res.json(createResponse(true, 'Ad graphic fetched successfully', adGraphic));
  } catch (error: unknown) {
    console.error('Error in getAdGraphicHandler:', error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}

export async function deleteAdGraphicHandler(
  req: Request<UpdateAdGraphicInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const adGraphicId = req.params.id;

    const adGraphic = await findAdGraphic({ _id: adGraphicId });

    if (!adGraphic) {
      return res.status(404).json(createResponse(false, 'Ad graphic not found', null));
    }

    if (String(adGraphic.userId) !== userId) {
      return res.status(403).json(createResponse(false, 'Forbidden', null));
    }

    await deleteAdGraphic(adGraphicId);
    return res.json(createResponse(true, 'Ad graphic deleted successfully', null));
  } catch (error: unknown) {
    console.error('Error in deleteAdGraphicHandler:', error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}
