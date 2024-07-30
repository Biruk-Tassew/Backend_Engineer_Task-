import mongoose from "mongoose";

export interface AdGraphicInput {
  user: string
  fileName: string;
  fileType: string; 
  fileSize: number; 
  uploadDate: Date;
  fileUrl: string; 
}

export interface AdGraphicDocument extends AdGraphicInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const adGraphicSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true, default: Date.now },
    fileUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AdGraphicModel = mongoose.model<AdGraphicDocument>("AdGraphic", adGraphicSchema);

export default AdGraphicModel;
