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
exports.deleteAdGraphicHandler = exports.getAdGraphicHandler = exports.updateAdGraphicHandler = exports.createAdGraphicHandler = void 0;
const adGraphic_service_1 = require("../service/adGraphic.service");
const upload_service_1 = __importDefault(require("../service/upload.service"));
const videoCompressor_1 = __importDefault(require("../utils/videoCompressor"));
const response_1 = require("../utils/response");
const cloudinaryService = new upload_service_1.default();
function createAdGraphicHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path)) {
                return res.status(400).json((0, response_1.createResponse)(false, 'No file provided or file path is missing', null));
            }
            let filePath = req.file.path;
            const videoCompressionLevel = Number(req.body.videoCompressionLevel) || 0;
            if (req.file.mimetype.startsWith('video/')) {
                filePath = yield (0, videoCompressor_1.default)(filePath, videoCompressionLevel);
            }
            const fileUploadResult = yield cloudinaryService.uploadFile(filePath);
            const userId = res.locals.user._id;
            const adGraphic = yield (0, adGraphic_service_1.createAdGraphic)({
                userId: userId,
                adId: req.body.adId,
                fileName: req.body.fileName || fileUploadResult.public_id,
                fileType: req.file.mimetype || '',
                fileSize: req.file.size || 0,
                fileUrl: fileUploadResult.secure_url,
                uploadDate: new Date(),
            });
            return res.status(201).json((0, response_1.createResponse)(true, 'Ad graphic created successfully', adGraphic));
        }
        catch (error) {
            let errorMessage = 'Internal Server Error';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error('Error in createAdGraphicHandler:', errorMessage);
            return res.status(500).json((0, response_1.createResponse)(false, errorMessage, null, error));
        }
    });
}
exports.createAdGraphicHandler = createAdGraphicHandler;
function updateAdGraphicHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const adGraphicId = req.params.id;
            const update = req.body;
            const adGraphic = yield (0, adGraphic_service_1.findAdGraphic)({ _id: adGraphicId });
            if (!adGraphic) {
                return res.status(404).json((0, response_1.createResponse)(false, 'Ad graphic not found', null));
            }
            if (String(adGraphic.userId) !== userId) {
                return res.status(403).json((0, response_1.createResponse)(false, 'Forbidden', null));
            }
            const updatedAdGraphic = yield (0, adGraphic_service_1.findAndUpdateAdGraphic)({ _id: adGraphicId }, update, {
                new: true,
            });
            return res.json((0, response_1.createResponse)(true, 'Ad graphic updated successfully', updatedAdGraphic));
        }
        catch (error) {
            console.error('Error in updateAdGraphicHandler:', error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.updateAdGraphicHandler = updateAdGraphicHandler;
function getAdGraphicHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adGraphicId = req.params.id;
            const adGraphic = yield (0, adGraphic_service_1.findAdGraphic)({ _id: adGraphicId });
            if (!adGraphic) {
                return res.status(404).json((0, response_1.createResponse)(false, 'Ad graphic not found', null));
            }
            return res.json((0, response_1.createResponse)(true, 'Ad graphic fetched successfully', adGraphic));
        }
        catch (error) {
            console.error('Error in getAdGraphicHandler:', error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.getAdGraphicHandler = getAdGraphicHandler;
function deleteAdGraphicHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const adGraphicId = req.params.id;
            const adGraphic = yield (0, adGraphic_service_1.findAdGraphic)({ _id: adGraphicId });
            if (!adGraphic) {
                return res.status(404).json((0, response_1.createResponse)(false, 'Ad graphic not found', null));
            }
            if (String(adGraphic.userId) !== userId) {
                return res.status(403).json((0, response_1.createResponse)(false, 'Forbidden', null));
            }
            yield (0, adGraphic_service_1.deleteAdGraphic)(adGraphicId);
            return res.json((0, response_1.createResponse)(true, 'Ad graphic deleted successfully', null));
        }
        catch (error) {
            console.error('Error in deleteAdGraphicHandler:', error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.deleteAdGraphicHandler = deleteAdGraphicHandler;
