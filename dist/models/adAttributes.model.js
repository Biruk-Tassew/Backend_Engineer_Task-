"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adAttributeSchema = new mongoose_1.default.Schema({
    adId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Ad', required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
}, {
    timestamps: true,
});
const AdAttributeModel = mongoose_1.default.model("AdAttribute", adAttributeSchema);
exports.default = AdAttributeModel;
