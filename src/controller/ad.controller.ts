import { Request, Response } from "express";
import { CreateAdInput, UpdateAdInput } from "../schema/ad.schema";
import {
  createAd,
  deleteAd,
  findAndUpdateAd,
  findAd,
  findAllAds,
} from "../service/ad.service";

// Handler to create a new ad
export async function createAdHandler(
  req: Request<{}, {}, CreateAdInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;

    // Create a new ad with user ID
    const ad = await createAd({
      ...req.body,
      user: userId,
    });

    return res.status(201).json(ad);
  } catch (error: unknown) {
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error in createAdHandler:', errorMessage);
    return res.status(500).send(errorMessage);
  }
}

// Handler to update an existing ad
export async function updateAdHandler(
  req: Request<{ id: string }, {}, UpdateAdInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const id = req.params.id;
    const update = req.body;

    // Find the ad to update
    const ad = await findAd({ _id: id });

    if (!ad) {
      return res.sendStatus(404);
    }

    // Check if the user has permission to update the ad
    if (String(ad.user) !== userId) {
      return res.sendStatus(403);
    }

    // Update the ad
    const updatedAd = await findAndUpdateAd({ _id: id }, update, { new: true });

    return res.send(updatedAd);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
  }
}

// Handler to get a specific ad by ID
export async function getAdHandler(
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> {
  try {
    const id = req.params.id;
    const ad = await findAd({ _id: id });

    if (!ad) {
      return res.sendStatus(404);
    }

    return res.send(ad);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
  }
}

// Handler to get all ad
export async function getAllAdsHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const ad = await findAllAds({});

    if (!ad) {
      return res.sendStatus(404);
    }

    return res.send(ad);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
  }
}

// Handler to delete a specific ad by ID
export async function deleteAdHandler(
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const id = req.params.id;

    // Find the ad to delete
    const ad = await findAd({ _id: id });

    if (!ad) {
      return res.sendStatus(404);
    }

    // Check if the user has permission to delete the ad
    if (String(ad.user) !== userId) {
      return res.sendStatus(403);
    }

    // Delete the ad
    await deleteAd(id);

    return res.sendStatus(200);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
  }
}
