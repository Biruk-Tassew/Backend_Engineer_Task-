import { Request, Response } from "express";
import { CreateAdAttributeInput, UpdateAdAttributeInput } from "../schema/adAttributes.schema";
import {
  createAdAttribute,
  deleteAdAttribute,
  findAndUpdateAdAttribute,
  findAdAttribute,
  findAdAttributesByAdId,
} from "../service/adAttribute.service";
import { createResponse } from "../utils/response"; 

export async function createAdAttributeHandler(req: Request<{}, {}, CreateAdAttributeInput["body"]>, res: Response): Promise<Response> {
  try {
    const adAttribute = await createAdAttribute(req.body);
    return res.status(201).json(createResponse(true, "Ad attribute created successfully", adAttribute));
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error in createAdAttributeHandler:", errorMessage);
    return res.status(500).json(createResponse(false, errorMessage, null, error));
  }
}

export async function updateAdAttributeHandler(
  req: Request<UpdateAdAttributeInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const adAttributeId = req.params.id;
    const update = req.body;

    const adAttribute = await findAdAttribute({ _id: adAttributeId });

    if (!adAttribute) {
      return res.status(404).json(createResponse(false, "Ad attribute not found", null));
    }

    const updatedAdAttribute = await findAndUpdateAdAttribute({ _id: adAttributeId }, update, { new: true });
    return res.json(createResponse(true, "Ad attribute updated successfully", updatedAdAttribute));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, "Internal Server Error", null, error));
  }
}

export async function getAdAttributeHandler(
  req: Request<UpdateAdAttributeInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const adAttributeId = req.params.id;
    const adAttribute = await findAdAttribute({ _id: adAttributeId });

    if (!adAttribute) {
      return res.status(404).json(createResponse(false, "Ad attribute not found", null));
    }

    return res.json(createResponse(true, "Ad attribute fetched successfully", adAttribute));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, "Internal Server Error", null, error));
  }
}

export async function getAdAttributeByAdHandler(
  req: Request<UpdateAdAttributeInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const adId = req.params.id;
    const adAttribute = await findAdAttributesByAdId(adId);

    if (!adAttribute) {
      return res.status(404).json(createResponse(false, "Ad attributes not found", null));
    }

    return res.json(createResponse(true, "Ad attributes fetched successfully", adAttribute));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, "Internal Server Error", null, error));
  }
}

export async function deleteAdAttributeHandler(
  req: Request<UpdateAdAttributeInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const adAttributeId = req.params.id;

    const adAttribute = await findAdAttribute({ _id: adAttributeId });

    if (!adAttribute) {
      return res.status(404).json(createResponse(false, "Ad attribute not found", null));
    }

    await deleteAdAttribute(adAttributeId);
    return res.json(createResponse(true, "Ad attribute deleted successfully", null));
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json(createResponse(false, "Internal Server Error", null, error));
  }
}
