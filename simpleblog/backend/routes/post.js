const express = require('express');
const {Post} = require('../models/post');

const router = express.Router();

router.get('/', async (req, res) => {
  const start = req.query.skip ? parseInt(req.query.skip) : 0;
  const count = req.query.limit ? parseInt(req.query.limit) : 5;
  try {
    const posts = await Post.find().select('-createdAt -updatedAt -__v')
                      .skip(start).limit(count);
    return res.status(200).send({posts});
  }  catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  let statusCode;
  try {
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
    const post = await Post.find({ _id: parseInt(req.params.postId) });
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

router.patch('/post/:postId', async (req, res) => {
  let statusCode;
  try {
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
