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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdHandler = exports.getAllAdsHandler = exports.getAdHandler = exports.updateAdHandler = exports.createAdHandler = void 0;
const ad_service_1 = require("../service/ad.service");
const response_1 = require("../utils/response");
function createAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const ad = yield (0, ad_service_1.createAd)(Object.assign(Object.assign({}, req.body), { user: userId }));
            return res.status(201).json((0, response_1.createResponse)(true, "Ad created successfully", ad));
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
            console.error('Error in createAdHandler:', errorMessage);
            return res.status(500).json((0, response_1.createResponse)(false, errorMessage, null, error));
        }
    });
}
exports.createAdHandler = createAdHandler;
function updateAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const { id } = req.params;
            const update = req.body;
            const ad = yield (0, ad_service_1.findAd)({ _id: id });
            if (!ad)
                return res.status(404).json((0, response_1.createResponse)(false, "Ad not found"));
            if (String(ad.user) !== userId)
                return res.status(403).json((0, response_1.createResponse)(false, "Forbidden"));
            const updatedAd = yield (0, ad_service_1.findAndUpdateAd)({ _id: id }, update, { new: true });
            return res.json((0, response_1.createResponse)(true, "Ad updated successfully", updatedAd));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.updateAdHandler = updateAdHandler;
function getAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const ad = yield (0, ad_service_1.findAd)({ _id: id });
            if (!ad)
                return res.status(404).json((0, response_1.createResponse)(false, "Ad not found"));
            return res.json((0, response_1.createResponse)(true, "Ad retrieved successfully", ad));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.getAdHandler = getAdHandler;
function getAllAdsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ads = yield (0, ad_service_1.findAllAds)({});
            if (!ads)
                return res.status(404).json((0, response_1.createResponse)(false, "Ads not found"));
            return res.json((0, response_1.createResponse)(true, "Ads retrieved successfully", ads));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.getAllAdsHandler = getAllAdsHandler;
function deleteAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const { id } = req.params;
            const ad = yield (0, ad_service_1.findAd)({ _id: id });
            if (!ad)
                return res.status(404).json((0, response_1.createResponse)(false, "Ad not found"));
            if (String(ad.user) !== userId)
                return res.status(403).json((0, response_1.createResponse)(false, "Forbidden"));
            yield (0, ad_service_1.deleteAd)(id);
            return res.json((0, response_1.createResponse)(true, "Ad deleted successfully"));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.deleteAdHandler = deleteAdHandler;
