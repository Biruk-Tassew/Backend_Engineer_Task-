"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        return res.status(403).json((0, response_1.createResponse)(false, "Access denied. User not authenticated."));
    }
    return next();
};
exports.default = requireUser;
