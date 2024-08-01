import mongoose from "mongoose";

export interface AdInput {
  title: string;
  description: string;
  user: string; 
}

export interface AdQuery {
  _id: string;
}

export interface AdDocument extends AdInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  attributes: mongoose.Types.ObjectId[];
  graphics: mongoose.Types.ObjectId[];
}

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdAttribute' }],
    graphics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdGraphic' }],
  },
  {
    timestamps: true,
  }
);

const AdModel = mongoose.model<AdDocument>("Ad", adSchema);

export default AdModel;
