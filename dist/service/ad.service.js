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
exports.deleteAd = exports.findAndUpdateAd = exports.findAllAds = exports.findAd = exports.createAd = void 0;
const ad_model_1 = __importDefault(require("../models/ad.model"));
const adAttributes_model_1 = __importDefault(require("../models/adAttributes.model"));
const adGraphic_model_1 = __importDefault(require("../models/adGraphic.model"));
/**
 * Create a new ad.
 *
 * @param input - The ad input data.
 * @returns A promise that resolves to the created ad document.
 */
function createAd(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return ad_model_1.default.create(input);
    });
}
exports.createAd = createAd;
/**
 * Find a specific ad by query and populate its attributes.
 *
 * @param query - The query to find the ad.
 * @returns A promise that resolves to the ad document or null.
 */
function findAd(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return ad_model_1.default.findOne(query).populate("attributes").populate("graphics");
    });
}
exports.findAd = findAd;
/**
 * Find all ads matching the query and return them as plain objects.
 *
 * @param query - The query to filter ads.
 * @returns A promise that resolves to an array of ads.
 */
function findAllAds(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return ad_model_1.default.find(query).populate("attributes").populate("graphics").lean();
    });
}
exports.findAllAds = findAllAds;
/**
 * Find an ad by query, update it, and populate its attributes.
 *
 * @param query - The query to find the ad.
 * @param update - The update data for the ad.
 * @param options - Options for the update operation.
 * @returns A promise that resolves to the updated ad document or null.
 */
function findAndUpdateAd(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return ad_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateAd = findAndUpdateAd;
/**
 * Delete an ad and its associated ad attributes by its ID.
 *
 * @param id - The ID of the ad to delete.
 */
function deleteAd(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ad = yield ad_model_1.default.findById(id).lean();
            if (!ad) {
                throw new Error("Ad not found");
            }
            yield adAttributes_model_1.default.deleteMany({ adId: id });
            yield adGraphic_model_1.default.deleteMany({ adId: id });
            yield ad_model_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            console.error("Error deleting ad and its attributes:", error);
            throw error;
        }
    });
}
exports.deleteAd = deleteAd;
