import { Request, Response } from "express";
import { CreateAdGraphicInput, UpdateAdGraphicInput } from "../schema/adGraphic.schema";
import {
  createAdGraphic,
  deleteAdGraphic,
  findAndUpdateAdGraphic,
  findAdGraphic,
} from "../service/adGraphic.service";

/**
 * Creates a new ad graphic.
 * 
 * @param req - The Express request object, containing the ad graphic data.
 * @param res - The Express response object.
 */
export async function createAdGraphicHandler(
  req: Request<{}, {}, CreateAdGraphicInput[]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    // Handle file upload details
    const fileData = req.file;
    if (!fileData) {
      return res.status(400).send("File upload failed");
    }

    const adGraphic = await createAdGraphic({
      user: userId,
      fileName: fileData.filename,
      fileType: fileData.mimetype,
      fileSize: fileData.size,
      fileUrl: fileData.path,
      uploadDate: new Date(), // This is automatically set, can be omitted if using default
    });

    return res.send(adGraphic);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e.message);
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

    if (String(adGraphic.user) !== userId) {
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

    if (String(adGraphic.user) !== userId) {
      return res.sendStatus(403);
    }

    await deleteAdGraphic( adGraphicId );

    return res.sendStatus(200);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}
