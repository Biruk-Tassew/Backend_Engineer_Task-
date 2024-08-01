import AdAttributeModel, { AdAttributeInput, AdAttributeDocument, AdAttributeQuery } from "../models/adAttributes.model";
import { CreateAdAttributeInput } from "../schema/adAttributes.schema";

export async function createAdAttribute(input: AdAttributeInput): Promise<AdAttributeDocument> {
  return AdAttributeModel.create(input);
}

export async function findAdAttribute(query: Partial<AdAttributeQuery>): Promise<AdAttributeDocument | null> {
  return AdAttributeModel.findOne(query);
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
