const { Readable } = require('stream');

/**helpers.js
 *
 * Contains helper functions for performing simple CRUD operations
 */
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file) {
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

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
}

module.exports = {
  uploadToCloudinary,
};
