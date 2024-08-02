"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilePresence = void 0;
const response_1 = require("../utils/response");
const validateFilePresence = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json((0, response_1.createResponse)(false, 'File is required'));
    }
    next();
};
exports.validateFilePresence = validateFilePresence;
