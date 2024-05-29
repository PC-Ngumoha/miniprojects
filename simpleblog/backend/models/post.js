const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, {timestamps: true});

postSchema.plugin(AutoIncrement);

const Post = mongoose.model('Post', postSchema);

module.exports = {
  Post,
  postSchema,
};
