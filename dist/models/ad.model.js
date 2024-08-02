"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    attributes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'AdAttribute' }],
    graphics: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'AdGraphic' }],
}, {
    timestamps: true,
});
const AdModel = mongoose_1.default.model("Ad", adSchema);
exports.default = AdModel;
