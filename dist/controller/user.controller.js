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
exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("../utils/logger"));
const response_1 = require("../utils/response");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUser)(req.body);
            return res.status(201).json((0, response_1.createResponse)(true, "User created successfully", user));
        }
        catch (e) {
            let errorMessage = 'Conflict';
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            logger_1.default.error(e);
            return res.status(409).json((0, response_1.createResponse)(false, errorMessage, null, e));
        }
    });
}
exports.createUserHandler = createUserHandler;
