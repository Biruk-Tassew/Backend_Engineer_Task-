"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdAttribute = exports.findAndUpdateAdAttribute = exports.findAdAttributesByAdId = exports.findAdAttribute = exports.createAdAttribute = void 0;
const ad_model_1 = __importDefault(require("../models/ad.model"));
const adAttributes_model_1 = __importDefault(require("../models/adAttributes.model"));
/**
 * Create a new ad attribute and link it to the ad.
 *
 * @param input - The ad attribute input data.
 * @returns A promise that resolves to the created ad attribute document.
 */
function createAdAttribute(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const adAttribute = yield adAttributes_model_1.default.create(input);
        yield ad_model_1.default.findByIdAndUpdate(input.adId, {
            $push: { attributes: adAttribute._id }
        });
        return adAttribute;
    });
}
exports.createAdAttribute = createAdAttribute;
function findAdAttribute(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return adAttributes_model_1.default.findOne(query);
    });
}
exports.findAdAttribute = findAdAttribute;
function findAdAttributesByAdId(adId) {
    return __awaiter(this, void 0, void 0, function* () {
        return adAttributes_model_1.default.find({ adId: adId });
    });
}
exports.findAdAttributesByAdId = findAdAttributesByAdId;
function findAndUpdateAdAttribute(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return adAttributes_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateAdAttribute = findAndUpdateAdAttribute;
function deleteAdAttribute(adAttributeId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield adAttributes_model_1.default.findByIdAndDelete(adAttributeId);
    });
}
exports.deleteAdAttribute = deleteAdAttribute;
