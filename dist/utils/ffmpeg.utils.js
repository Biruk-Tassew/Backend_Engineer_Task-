"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
// Set the FFmpeg path
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.path);
// Optionally log the path and version
// console.log(ffmpegPath, ffmpegInstaller.version);
exports.default = fluent_ffmpeg_1.default;
