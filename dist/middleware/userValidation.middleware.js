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
exports.checkEmailNotUsed = void 0;
const user_service_1 = require("../service/user.service"); // Assume this service function exists and retrieves a user by email
function checkEmailNotUsed(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            if (!email) {
                return res.status(400).json({ success: false, message: "Email is required" });
            }
            const existingUser = yield (0, user_service_1.findUserByEmail)(email);
            if (existingUser) {
                return res.status(409).json({ success: false, message: "Email is already in use" });
            }
            next();
        }
        catch (error) {
            let errorMessage = 'Internal Server Error';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(500).json({ success: false, message: errorMessage });
        }
    });
}
exports.checkEmailNotUsed = checkEmailNotUsed;
