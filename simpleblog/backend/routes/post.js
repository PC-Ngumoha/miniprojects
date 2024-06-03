const express = require('express');
const { Post } = require('../models/post');
const { upload } = require('../config/multerConfig');
const { uploadToCloudinary } = require('../utils/helpers');

const router = express.Router();

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *        - title
 *        - body
 *      properties:
 *        title:
 *          type: string
 *          description: The title of the blog post
 *        body:
 *          type: string
 *          description: The content of the blog post
 *        thumbnail:
 *          type: string
 *          description: The URL of the blog's thumbnail image
 */


/**
 * @swagger
 *
 * /api/posts/:
 *  get:
 *    summary: Get posts available in the DB.
 *    tags: [Post]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 0
 *        description: The page to return
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 5
 *        description: The number of posts to return on a page.
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        description: A term to filter search results by. Case Insensitive.
 *    response:
 *      200:
 *        description: Returns a paginated list of all available posts.
 */

router.get('/', async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const count = req.query.limit ? parseInt(req.query.limit) : 5;
  const search = req.query.search;
  let posts;
  try {
    if (search) {
      posts = await Post.find({ title: { $regex: new RegExp(search, 'i') } })
                      .select('-createdAt -updatedAt -__v')
                      .skip(page).limit(count);
    } else {
      posts = await Post.find()
                      .select('-createdAt -updatedAt -__v')
                      .skip(page).limit(count);
    }
    return res.status(200).send({posts});
  }  catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


/**
 * @swagger
 *
 * /api/posts/:
 *  post:
 *    summary: Enables us to create a new post
 *    tags: [Post]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                required: true
 *              body:
 *                type: string
 *                required: true
 *              thumbnail:
 *                type: string
 *                format: binary
 *    responses:
 *      201:
 *        description: Created new post successfully
 *
 *      400:
 *        description: Bad Request
 *
 */

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


/**
 * @swagger
 *
 * /api/posts/post/{id}:
 *  get:
 *   summary: Enables us to retrieve a specific blog post
 *   tags: [Post]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: ObjectID
 *      description: The ID of the Blog post we want.
 *   responses:
 *    200:
 *      description: Blog post retrieved successfully
 *    404:
 *      description: Could not retrieve Blog post. Because it doesn't exist.
 */

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


/**
 * @swagger
 *
 * /api/posts/post/{id}:
 *  patch:
 *   summary: Enables us to update content of a specific blog post
 *   tags: [Post]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: ObjectID
 *      description: The ID of the Blog post we want.
 *   requestBody:
 *    required: true
 *    content:
 *      multipart/form-data:
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            body:
 *              type: string
 *            thumbnail:
 *              type: string
 *              format: binary
 *   responses:
 *    200:
 *      description: Blog post updated successfully
 *    400:
 *      description: Bad Request body or ID
 */

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


/**
 * @swagger
 *
 * /api/posts/post/{id}:
 *  delete:
 *   summary: Enables us to delete a specific blog post
 *   tags: [Post]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: ObjectID
 *      description: The ID of the Blog post we want.
 *   responses:
 *    200:
 *      description: Blog post deleted successfully
 */

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
