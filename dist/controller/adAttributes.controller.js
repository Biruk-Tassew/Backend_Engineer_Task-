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
exports.deleteAdAttributeHandler = exports.getAdAttributeByAdHandler = exports.getAdAttributeHandler = exports.updateAdAttributeHandler = exports.createAdAttributeHandler = void 0;
const adAttribute_service_1 = require("../service/adAttribute.service");
const response_1 = require("../utils/response");
function createAdAttributeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adAttribute = yield (0, adAttribute_service_1.createAdAttribute)(req.body);
            return res.status(201).json((0, response_1.createResponse)(true, "Ad attribute created successfully", adAttribute));
        }
        catch (error) {
            let errorMessage = "Internal Server Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error("Error in createAdAttributeHandler:", errorMessage);
            return res.status(500).json((0, response_1.createResponse)(false, errorMessage, null, error));
        }
    });
}
exports.createAdAttributeHandler = createAdAttributeHandler;
function updateAdAttributeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adAttributeId = req.params.id;
            const update = req.body;
            const adAttribute = yield (0, adAttribute_service_1.findAdAttribute)({ _id: adAttributeId });
            if (!adAttribute) {
                return res.status(404).json((0, response_1.createResponse)(false, "Ad attribute not found", null));
            }
            const updatedAdAttribute = yield (0, adAttribute_service_1.findAndUpdateAdAttribute)({ _id: adAttributeId }, update, { new: true });
            return res.json((0, response_1.createResponse)(true, "Ad attribute updated successfully", updatedAdAttribute));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, "Internal Server Error", null, error));
        }
    });
}
exports.updateAdAttributeHandler = updateAdAttributeHandler;
function getAdAttributeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adAttributeId = req.params.id;
            const adAttribute = yield (0, adAttribute_service_1.findAdAttribute)({ _id: adAttributeId });
            if (!adAttribute) {
                return res.status(404).json((0, response_1.createResponse)(false, "Ad attribute not found", null));
            }
            return res.json((0, response_1.createResponse)(true, "Ad attribute fetched successfully", adAttribute));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, "Internal Server Error", null, error));
        }
    });
}
exports.getAdAttributeHandler = getAdAttributeHandler;
function getAdAttributeByAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adId = req.params.id;
            const adAttribute = yield (0, adAttribute_service_1.findAdAttributesByAdId)(adId);
            if (!adAttribute) {
                return res.status(404).json((0, response_1.createResponse)(false, "Ad attributes not found", null));
            }
            return res.json((0, response_1.createResponse)(true, "Ad attributes fetched successfully", adAttribute));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, "Internal Server Error", null, error));
        }
    });
}
exports.getAdAttributeByAdHandler = getAdAttributeByAdHandler;
function deleteAdAttributeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adAttributeId = req.params.id;
            const adAttribute = yield (0, adAttribute_service_1.findAdAttribute)({ _id: adAttributeId });
            if (!adAttribute) {
                return res.status(404).json((0, response_1.createResponse)(false, "Ad attribute not found", null));
            }
            yield (0, adAttribute_service_1.deleteAdAttribute)(adAttributeId);
            return res.json((0, response_1.createResponse)(true, "Ad attribute deleted successfully", null));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.createResponse)(false, "Internal Server Error", null, error));
        }
    });
}
exports.deleteAdAttributeHandler = deleteAdAttributeHandler;
