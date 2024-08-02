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
exports.deleteAdGraphic = exports.findAndUpdateAdGraphic = exports.updateAdGraphic = exports.findAllAdGraphics = exports.findAdGraphic = exports.createAdGraphic = void 0;
const adGraphic_model_1 = __importDefault(require("../models/adGraphic.model"));
const ad_model_1 = __importDefault(require("../models/ad.model"));
/**
 * Creates a new ad graphic record in the database.
 *
 * @param input - The ad graphic data to be saved.
 * @returns The created ad graphic object with sensitive fields omitted.
 */
function createAdGraphic(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adGraphic = yield adGraphic_model_1.default.create(input);
            yield ad_model_1.default.findByIdAndUpdate(input.adId, {
                $push: { graphics: adGraphic._id }
            });
            return adGraphic.toJSON();
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.createAdGraphic = createAdGraphic;
/**
 * Finds an ad graphic by query.
 *
 * @param query - The query to search for an ad graphic.
 * @returns The found ad graphic or null if not found.
 */
function findAdGraphic(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return adGraphic_model_1.default.findOne(query).lean();
    });
}
exports.findAdGraphic = findAdGraphic;
/**
 * Finds all ad graphics matching the query.
 *
 * @param query - The query to search for ad graphics.
 * @returns A list of ad graphics matching the query.
 */
function findAllAdGraphics(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return adGraphic_model_1.default.find(query).lean();
    });
}
exports.findAllAdGraphics = findAllAdGraphics;
/**
 * Updates an existing ad graphic by its ID.
 *
 * @param id - The ID of the ad graphic to be updated.
 * @param update - The update data.
 * @returns The updated ad graphic or null if not found.
 */
function updateAdGraphic(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adGraphic = yield adGraphic_model_1.default.findByIdAndUpdate(id, update, { new: true }).lean();
            return adGraphic;
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.updateAdGraphic = updateAdGraphic;
/**
 * Finds an ad graphic by query and updates it with new data.
 *
 * @param query - The query to find the ad graphic.
 * @param update - The update data.
 * @param options - Options for the update operation (e.g., { new: true } to return the updated document).
 * @returns The updated ad graphic or null if not found.
 */
function findAndUpdateAdGraphic(query, update, options = { new: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adGraphic = yield adGraphic_model_1.default.findOneAndUpdate(query, update, options).lean();
            return adGraphic;
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.findAndUpdateAdGraphic = findAndUpdateAdGraphic;
/**
 * Deletes an ad graphic by its ID.
 *
 * @param id - The ID of the ad graphic to be deleted.
 * @returns The deleted ad graphic or null if not found.
 */
function deleteAdGraphic(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adGraphic = yield adGraphic_model_1.default.findByIdAndDelete(id).lean();
            return adGraphic;
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.deleteAdGraphic = deleteAdGraphic;
