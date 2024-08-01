import AdModel, { AdInput, AdDocument, AdQuery } from "../models/ad.model";

export async function createAd(input: AdInput): Promise<AdDocument> {
  return AdModel.create(input);
}

export async function findAd(query: Partial<AdQuery>): Promise<AdDocument | null> {
  return AdModel.findOne(query).populate('attributes');
}

export async function findAndUpdateAd(
  query: Partial<AdQuery>,
  update: Partial<AdInput>,
  options: Record<string, unknown>
): Promise<AdDocument | null> {
  return AdModel.findOneAndUpdate(query, update, options).populate('attributes');
}

export async function deleteAd(id: string): Promise<void> {
  await AdModel.findByIdAndDelete(id);
}
