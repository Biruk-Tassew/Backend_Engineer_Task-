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
const user_model_1 = require("../models/user.model"); // Assuming your UserRole enum is here
const adGraphic_model_1 = __importDefault(require("../models/adGraphic.model"));
const ad_model_1 = __importDefault(require("../models/ad.model"));
const adAttributes_model_1 = __importDefault(require("../models/adAttributes.model"));
const response_1 = require("../utils/response");
// Define permissions for each resource
const permissions = [
    // User model permissions
    { resource: "User", roles: [user_model_1.UserRole.ADMIN] },
    // AdGraphics model permissions
    { resource: "AdGraphics", roles: [user_model_1.UserRole.ADMIN, user_model_1.UserRole.MODERATOR, user_model_1.UserRole.ANALYTICS, user_model_1.UserRole.SUPPORT, user_model_1.UserRole.ADVERTISER] },
    { resource: "AdGraphics:own", roles: [user_model_1.UserRole.ADVERTISER], ownershipCheck: true },
    // Ad model permissions
    { resource: "Ad", roles: [user_model_1.UserRole.ADMIN, user_model_1.UserRole.MODERATOR, user_model_1.UserRole.ANALYTICS, user_model_1.UserRole.SUPPORT, user_model_1.UserRole.ADVERTISER] },
    { resource: "Ad:own", roles: [user_model_1.UserRole.ADMIN, user_model_1.UserRole.MODERATOR, user_model_1.UserRole.ANALYTICS, user_model_1.UserRole.SUPPORT, user_model_1.UserRole.ADVERTISER], ownershipCheck: true },
    // AdAttribute model permissions
    { resource: "AdAttribute", roles: [user_model_1.UserRole.ADMIN, user_model_1.UserRole.MODERATOR, user_model_1.UserRole.ANALYTICS, user_model_1.UserRole.SUPPORT, user_model_1.UserRole.ADVERTISER] },
    { resource: "AdAttribute:own", roles: [user_model_1.UserRole.ADMIN, user_model_1.UserRole.MODERATOR, user_model_1.UserRole.ANALYTICS, user_model_1.UserRole.SUPPORT, user_model_1.UserRole.ADVERTISER], ownershipCheck: true },
];
// Middleware to check permissions
function authorize(resource, action) {
    return (req, res, next) => {
        const userRole = res.locals.user.role;
        const userId = res.locals.user._id;
        const resourceId = req.params.id || req.body.adId; // Adjust according to your routing logic
        // Find the permission rule
        const permission = permissions.find((perm) => perm.resource === `${resource}:${action}` || perm.resource === resource);
        if (!permission) {
            return res.status(403).json((0, response_1.createResponse)(false, "Access denied. No permission configuration found."));
        }
        // Check if the user's role is allowed
        if (!permission.roles.includes(userRole)) {
            return res.status(403).json((0, response_1.createResponse)(false, "Access denied. Role not authorized."));
        }
        // If ownership check is required, verify the user owns the resource
        if (permission.ownershipCheck && action !== 'create') {
            verifyOwnership(resource, resourceId, userId)
                .then((ownsResource) => {
                if (!ownsResource) {
                    return res.status(403).json((0, response_1.createResponse)(false, "Access denied. Not the resource owner."));
                }
                next();
            })
                .catch((err) => {
                console.error("Error verifying ownership:", err);
                return res.status(500).json((0, response_1.createResponse)(false, "Internal server error.", undefined, err));
            });
        }
        else {
            next();
        }
    };
}
// Helper function to verify ownership
function verifyOwnership(resource, resourceId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Implement ownership check logic
        switch (resource) {
            case "AdGraphics": {
                const adGraphic = yield adGraphic_model_1.default.findById(resourceId);
                return adGraphic !== null && adGraphic.userId === userId;
            }
            case "Ad": {
                const ad = yield ad_model_1.default.findById(resourceId);
                return ad !== null && ad.user === userId;
            }
            case "AdAttribute": {
                const adAttribute = yield adAttributes_model_1.default.findById(resourceId);
                const ad = yield ad_model_1.default.findById(adAttribute === null || adAttribute === void 0 ? void 0 : adAttribute.adId);
                return adAttribute !== null && ad !== null && ad.user === userId;
            }
            default:
                return false;
        }
    });
}
exports.default = authorize;
