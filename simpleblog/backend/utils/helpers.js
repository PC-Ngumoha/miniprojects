const { Readable } = require('stream');

/**helpers.js
 *
 * Contains helper functions for performing simple CRUD operations
 */
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: 'dtclph7k1',
  api_key: '743956918668563',
  api_secret: '4jtIhOpMFdVO3TFZxlJOagPNZew',
});

async function uploadToCloudinary(file, onProgress) {
  if (!file || !file.buffer) {
    throw new Error('No file buffer provided');
  }
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    throw new Error('Invalid file type, only accept .jpg / .png files');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({
      folder: 'simple_blog',
    }, (error, result) => {
      if (error) {
        return reject(new Error('Unable to upload file to Cloudinary'));
      }
      return resolve(result);
    });

    // Enables progress tracking
    if (onProgress) {
      uploadStream.on('progress', (progress) => {
        onProgress(progress);
      })
    }

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
}

module.exports = {
  uploadToCloudinary,
};
