import { FilterQuery } from "mongoose";
import AdModel, { AdInput, AdDocument, AdQuery } from "../models/ad.model";
import AdAttributeModel from "../models/adAttributes.model";
import AdGraphicModel from "../models/adGraphic.model";

/**
 * Create a new ad.
 *
 * @param input - The ad input data.
 * @returns A promise that resolves to the created ad document.
 */
export async function createAd(input: AdInput): Promise<AdDocument> {
  return AdModel.create(input);
}

/**
 * Find a specific ad by query and populate its attributes.
 *
 * @param query - The query to find the ad.
 * @returns A promise that resolves to the ad document or null.
 */
export async function findAd(query: Partial<AdQuery>): Promise<AdDocument | null> {
  return AdModel.findOne(query).populate("attributes").populate("graphics");
}

/**
 * Find all ads matching the query and return them as plain objects.
 *
 * @param query - The query to filter ads.
 * @returns A promise that resolves to an array of ads.
 */
export async function findAllAds(query: FilterQuery<AdDocument>) {
  return AdModel.find(query).populate("attributes").populate("graphics").lean();
}

/**
 * Find an ad by query, update it, and populate its attributes.
 *
 * @param query - The query to find the ad.
 * @param update - The update data for the ad.
 * @param options - Options for the update operation.
 * @returns A promise that resolves to the updated ad document or null.
 */
export async function findAndUpdateAd(
  query: Partial<AdQuery>,
  update: Partial<AdInput>,
  options: Record<string, unknown>
): Promise<AdDocument | null> {
  return AdModel.findOneAndUpdate(query, update, options);
}

/**
 * Delete an ad and its associated ad attributes by its ID.
 *
 * @param id - The ID of the ad to delete.
 */
export async function deleteAd(id: string): Promise<void> {
  try {
    const ad = await AdModel.findById(id).lean();
    if (!ad) {
      throw new Error("Ad not found");
    }

    await AdAttributeModel.deleteMany({ adId: id });
    await AdGraphicModel.deleteMany({ adId: id });

    await AdModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting ad and its attributes:", error);
    throw error;
  }
}
