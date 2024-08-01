const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
import fs from 'fs';


/**
 * Compresses a video file and returns the path of the compressed video.
 * 
 * @param inputPath - The path of the input video file.
 * @param compressionPercentage - The desired compression percentage (default is 60%).
 * @returns A promise that resolves with the path of the compressed video.
 */
const compressVideo = (inputPath: string, compressionPercentage: number = 60): Promise<string> => {
  const outputPath = inputPath.replace(/(\.\w+)$/, '_compressed$1');

  return new Promise((resolve, reject) => {
    // Get the original bitrate of the video
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err) {
        return reject(err);
      }

      const originalBitrate = metadata.format.bit_rate;
      if (!originalBitrate) {
        return reject(new Error('Could not determine original bitrate'));
      }

      // Calculate the target bitrate based on the compression percentage
      const targetBitrate = originalBitrate * (compressionPercentage / 100);

      ffmpeg(inputPath)
        .output(outputPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .size('1280x720')
        .videoBitrate(`${Math.floor(targetBitrate * 0.75 / 1000)}k`) // 75% of the target bitrate for video
        .audioBitrate(`${Math.floor(targetBitrate * 0.25 / 1000)}k`) // 25% of the target bitrate for audio
        .on('end', () => {
          const originalSize = fs.statSync(inputPath).size;
          const compressedSize = fs.statSync(outputPath).size;
          console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
          console.log(`Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Error compressing video:', err);
          reject(err);
        })
        .run();
    });
  });
};

export default compressVideo;
