const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
}, {timestamps: true});


const Post = mongoose.model('Post', postSchema);

module.exports = {
  Post
};
