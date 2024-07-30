import ffmpeg from 'fluent-ffmpeg';

const compressVideo = (inputPath: string, outputPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libx264') // Video codec
      .audioCodec('aac') // Audio codec
      .size('1280x720') // Resize video
      .videoBitrate('1000k') // Video bitrate
      .audioBitrate('128k') // Audio bitrate
      .on('end', () => {
        console.log('Video compression finished.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error compressing video:', err);
        reject(err);
      })
      .run();
  });
};

export default compressVideo;
