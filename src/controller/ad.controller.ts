import { Request, Response } from "express";
import { CreateAdInput, UpdateAdInput } from "../schema/ad.schema";
import {
  createAd,
  deleteAd,
  findAndUpdateAd,
  findAd,
  findAllAds,
} from "../service/ad.service";
import { createResponse } from "../utils/response";

export async function createAdHandler(
  req: Request<{}, {}, CreateAdInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const ad = await createAd({ ...req.body, user: userId });
    return res.status(201).json(createResponse(true, "Ad created successfully", ad));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error in createAdHandler:', errorMessage);
    return res.status(500).json(createResponse(false, errorMessage, null, error));
  }
}

export async function updateAdHandler(
  req: Request<{ id: string }, {}, UpdateAdInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const { id } = req.params;
    const update = req.body;
    const ad = await findAd({ _id: id });

    if (!ad) return res.status(404).json(createResponse(false, "Ad not found"));
    if (String(ad.user) !== userId) return res.status(403).json(createResponse(false, "Forbidden"));

    const updatedAd = await findAndUpdateAd({ _id: id }, update, { new: true });
    return res.json(createResponse(true, "Ad updated successfully", updatedAd));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}

export async function getAdHandler(
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const ad = await findAd({ _id: id });

    if (!ad) return res.status(404).json(createResponse(false, "Ad not found"));
    return res.json(createResponse(true, "Ad retrieved successfully", ad));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}

export async function getAllAdsHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const ads = await findAllAds({});
    if (!ads) return res.status(404).json(createResponse(false, "Ads not found"));
    return res.json(createResponse(true, "Ads retrieved successfully", ads));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}

export async function deleteAdHandler(
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const { id } = req.params;
    const ad = await findAd({ _id: id });

    if (!ad) return res.status(404).json(createResponse(false, "Ad not found"));
    if (String(ad.user) !== userId) return res.status(403).json(createResponse(false, "Forbidden"));

    await deleteAd(id);
    return res.json(createResponse(true, "Ad deleted successfully"));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}
