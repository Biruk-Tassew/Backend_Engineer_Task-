import mongoose from "mongoose";

export interface AdAttributeInput {
  adId: string;
  key: string;
  value: string;
}

export interface AdAttributeQuery {
  _id: string;
}

export interface AdAttributeDocument extends AdAttributeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const adAttributeSchema = new mongoose.Schema(
  {
    adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AdAttributeModel = mongoose.model<AdAttributeDocument>("AdAttribute", adAttributeSchema);

export default AdAttributeModel;
