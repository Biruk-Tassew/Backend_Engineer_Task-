import { Request, Response } from "express";
import { CreateAdAttributeInput, UpdateAdAttributeInput } from "../schema/adAttributes.schema";
import {
  createAdAttribute,
  deleteAdAttribute,
  findAndUpdateAdAttribute,
  findAdAttribute,
  findAdAttributesByAdId,
} from "../service/adAttribute.service";

export async function createAdAttributeHandler(req: Request<{}, {}, CreateAdAttributeInput["body"]>, res: Response): Promise<Response> {
  try {
    const adAttribute = await createAdAttribute( req.body );

    return res.status(201).json(adAttribute);
  } catch (error: unknown) {
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error in createAdAttributeHandler:', errorMessage);
    return res.status(500).send(errorMessage);
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
      return res.sendStatus(404);
    }

    const updatedAdAttribute = await findAndUpdateAdAttribute({ _id: adAttributeId }, update, { new: true });

    return res.send(updatedAdAttribute);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
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
      return res.sendStatus(404);
    }

    return res.send(adAttribute);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
  }
}

export async function getAdAttributeByAdHandler(
  req: Request<UpdateAdAttributeInput["params"]>,
  res: Response
): Promise<Response> {
  try {
    const adId = req.params.id;
    const adAttribute = await findAdAttributesByAdId( adId );

    if (!adAttribute) {
      return res.sendStatus(404);
    }

    return res.send(adAttribute);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
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
      return res.sendStatus(404);
    }

    await deleteAdAttribute(adAttributeId);

    return res.sendStatus(200);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).send(error);
  }
}
