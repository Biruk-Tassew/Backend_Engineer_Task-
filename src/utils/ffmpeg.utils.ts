import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

// Set the FFmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

// Optionally log the path and version
// console.log(ffmpegPath, ffmpegInstaller.version);

export default ffmpeg;
