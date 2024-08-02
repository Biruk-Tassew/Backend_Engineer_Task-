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
exports.deleteSessionHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const response_1 = require("../utils/response");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the user's password
            const user = yield (0, user_service_1.validatePassword)(req.body);
            if (!user) {
                return res.status(401).json((0, response_1.createResponse)(false, "Invalid email or password", null));
            }
            // Create a session
            const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
            // Create an access token
            const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "accessTokenPrivateKey", { expiresIn: config_1.default.get("accessTokenTtl") } // 15 minutes,
            );
            // Create a refresh token
            const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "refreshTokenPrivateKey", { expiresIn: config_1.default.get("refreshTokenTtl") } // 15 minutes
            );
            // Return access & refresh tokens
            return res.json((0, response_1.createResponse)(true, "Session created successfully", { accessToken, refreshToken }));
        }
        catch (error) {
            console.error('Error in createUserSessionHandler:', error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
            return res.json((0, response_1.createResponse)(true, "Sessions retrieved successfully", sessions));
        }
        catch (error) {
            console.error('Error in getUserSessionsHandler:', error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.getUserSessionsHandler = getUserSessionsHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sessionId = res.locals.user.session;
            yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
            return res.json((0, response_1.createResponse)(true, "Session deleted successfully", { accessToken: null, refreshToken: null }));
        }
        catch (error) {
            console.error('Error in deleteSessionHandler:', error);
            return res.status(500).json((0, response_1.createResponse)(false, 'Internal Server Error', null, error));
        }
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
