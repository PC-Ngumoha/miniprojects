const express = require('express');
const { Post } = require('../models/post');
const { upload } = require('../config/multerConfig');
const { uploadToCloudinary } = require('../utils/helpers');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    post:
 *      type: object
 */

router.get('/', async (req, res) => {
  const start = req.query.skip ? parseInt(req.query.skip) : 0;
  const count = req.query.limit ? parseInt(req.query.limit) : 5;
  const search = req.query.search;
  let posts;
  try {
    if (search) {
      posts = await Post.find({ title: { $regex: new RegExp(search, 'i') } })
                      .select('-createdAt -updatedAt -__v')
                      .skip(start).limit(count);
    } else {
      posts = await Post.find()
                      .select('-createdAt -updatedAt -__v')
                      .skip(start).limit(count);
    }
    return res.status(200).send({posts});
  }  catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post('/', upload.single('thumbnail'), async (req, res) => {
  const newPost = new Post(req.body);
  let statusCode;
  try {
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      newPost.thumbnail = result.secure_url;
    }
    await newPost.save();
    statusCode = 201;
  } catch (err) {
    console.log(err);
    statusCode = 400;
  }
  return res.status(statusCode).send({});
});

router.get('/post/:postId', async (req, res) => {
  let statusCode, output;
  try {
    const post = await Post.find({ _id: req.params.postId });
    if (post.length > 0) {
      statusCode = 200;
      output = {post: post[0]};
    } else {
      statusCode = 404;
      output = {};
    }
  } catch (err) {
    console.log(err);
    statusCode = 500;
    output = {};
  }
  return res.status(statusCode).send(output);
});

router.patch('/post/:postId', upload.single('thumbnail'), async (req, res) => {
  let statusCode;
  try {
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      req.body.thumbnail = result.secure_url;
    }
    await Post.updateOne(
      { _id: req.params.postId }, req.body);
    statusCode = 200;
  } catch (err) {
    console.log(err);
    statusCode = 400;
  }
  return res.status(statusCode).send({});
});

router.delete('/post/:postId', async (req, res) => {
  let statusCode;
  try {
    await Post.deleteOne({ _id: req.params.postId });
    statusCode = 204;
  } catch (err) {
    console.log(err);
    statusCode = 500;
  }
  return res.status(statusCode).send({});
});

module.exports = router;
