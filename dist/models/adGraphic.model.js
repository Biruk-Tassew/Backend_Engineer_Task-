"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adGraphicSchema = new mongoose_1.default.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true, default: Date.now },
    fileUrl: { type: String, required: true },
    adId: { type: String, required: true },
    userId: { type: String, required: true },
}, {
    timestamps: true,
});
const AdGraphicModel = mongoose_1.default.model("AdGraphic", adGraphicSchema);
exports.default = AdGraphicModel;
