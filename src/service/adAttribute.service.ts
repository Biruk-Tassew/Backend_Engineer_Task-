import AdModel from "../models/ad.model";
import AdAttributeModel, { AdAttributeInput, AdAttributeDocument, AdAttributeQuery } from "../models/adAttributes.model";
import { CreateAdAttributeInput } from "../schema/adAttributes.schema";

/**
 * Create a new ad attribute and link it to the ad.
 *
 * @param input - The ad attribute input data.
 * @returns A promise that resolves to the created ad attribute document.
 */
export async function createAdAttribute(input: AdAttributeInput): Promise<AdAttributeDocument> {
  const adAttribute = await AdAttributeModel.create(input);

  await AdModel.findByIdAndUpdate(input.adId, {
    $push: { attributes: adAttribute._id }
  });

  return adAttribute;
}

export async function findAdAttribute(query: Partial<AdAttributeQuery>): Promise<AdAttributeDocument | null> {
  return AdAttributeModel.findOne(query);
}

export async function findAdAttributesByAdId(adId: string): Promise<AdAttributeDocument[]> {
  return AdAttributeModel.find({ adId: adId });
}

export async function findAndUpdateAdAttribute(
  query: Partial<AdAttributeQuery>,
  update: Partial<AdAttributeInput>,
  options: Record<string, unknown>
): Promise<AdAttributeDocument | null> {
  return AdAttributeModel.findOneAndUpdate(query, update, options);
}

export async function deleteAdAttribute(adAttributeId: string): Promise<void> {
  await AdAttributeModel.findByIdAndDelete(adAttributeId);
}
