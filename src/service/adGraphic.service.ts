import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import AdGraphicModel, { AdGraphicDocument, AdGraphicInput } from "../models/adGraphic.model";
import AdModel from "../models/ad.model";

/**
 * Creates a new ad graphic record in the database.
 * 
 * @param input - The ad graphic data to be saved.
 * @returns The created ad graphic object with sensitive fields omitted.
 */
export async function createAdGraphic(input: AdGraphicInput) {
  try {
    const adGraphic = await AdGraphicModel.create(input);

    await AdModel.findByIdAndUpdate(input.adId, {
      $push: { graphics: adGraphic._id }
    });
    
    return adGraphic.toJSON();
  } catch (e: any) {
    throw new Error(e.message);
  }
}

/**
 * Finds an ad graphic by query.
 * 
 * @param query - The query to search for an ad graphic.
 * @returns The found ad graphic or null if not found.
 */
export async function findAdGraphic(query: FilterQuery<AdGraphicDocument>) {
  return AdGraphicModel.findOne(query).lean();
}

/**
 * Finds all ad graphics matching the query.
 * 
 * @param query - The query to search for ad graphics.
 * @returns A list of ad graphics matching the query.
 */
export async function findAllAdGraphics(query: FilterQuery<AdGraphicDocument>) {
  return AdGraphicModel.find(query).lean();
}

/**
 * Updates an existing ad graphic by its ID.
 * 
 * @param id - The ID of the ad graphic to be updated.
 * @param update - The update data.
 * @returns The updated ad graphic or null if not found.
 */
export async function updateAdGraphic(id: string, update: Partial<AdGraphicInput>) {
  try {
    const adGraphic = await AdGraphicModel.findByIdAndUpdate(id, update, { new: true }).lean();
    return adGraphic;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

/**
 * Finds an ad graphic by query and updates it with new data.
 * 
 * @param query - The query to find the ad graphic.
 * @param update - The update data.
 * @param options - Options for the update operation (e.g., { new: true } to return the updated document).
 * @returns The updated ad graphic or null if not found.
 */
export async function findAndUpdateAdGraphic(
  query: FilterQuery<AdGraphicDocument>,
  update: UpdateQuery<AdGraphicInput>,
  options: QueryOptions = { new: true }
) {
  try {
    const adGraphic = await AdGraphicModel.findOneAndUpdate(query, update, options).lean();
    return adGraphic;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

/**
 * Deletes an ad graphic by its ID.
 * 
 * @param id - The ID of the ad graphic to be deleted.
 * @returns The deleted ad graphic or null if not found.
 */
export async function deleteAdGraphic(id: string) {
  try {
    const adGraphic = await AdGraphicModel.findByIdAndDelete(id).lean();
    return adGraphic;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
