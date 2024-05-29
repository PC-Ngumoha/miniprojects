const request = require('supertest');
const mongoose = require('mongoose');
const { postSchema } = require('../models/post');
const { app, server } = require('../src/app');

const URI = 'mongodb://127.0.0.1:27017/testDB';
let conn, Post;

beforeAll(async () => {
  // Create new connection to test DB
  conn = await mongoose.createConnection(URI);
  Post = conn.model('Post', postSchema);
});

afterAll(async () => {
  // Disconnect from test DB
  await conn.close();
  await mongoose.disconnect();
  server.close();
});

beforeEach(async () => {
  // Clear DB after each test run
  await Post.deleteMany({});
});


describe('GET /api/posts/', () => {
  it('should return response status code 200', async () => {
    const mockPosts = [
      {title: 'Post #1', body: 'Post content goes here'},
      {title: 'Post #2', body: 'Post content goes here'}
    ]

    await Post.insertMany(mockPosts);

    const res = await request(app).get('/api/posts/')
                .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
  });

  describe('Response body', () => {
    it('should not be empty', async () => {
      const mockPosts = [
        {title: 'Post #1', body: 'Post content goes here'},
        {title: 'Post #2', body: 'Post content goes here'}
      ]

      await Post.insertMany(mockPosts);

      const res = await request(app).get('/api/posts/')
                  .set('Accept', 'application/json');
      expect(res.body).not.toEqual({});
      expect(res.body.posts).not.toBeUndefined();
    });

    it('should have objects containing fields: _id, title, body', async () => {
      const mockPosts = [
        {title: 'Post #1', body: 'Post content goes here'},
        {title: 'Post #2', body: 'Post content goes here'}
      ]

      await Post.insertMany(mockPosts);

      const res = await request(app).get('/api/posts/')
                  .set('Accept', 'application/json');

      res.body.posts.forEach(post => {
        expect(post).toHaveProperty('_id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');
      });
    });

    it('with objects lacking fields: createdAt, updatedAt', async () => {
      const mockPosts = [
        {title: 'Post #1', body: 'Post content goes here'},
        {title: 'Post #2', body: 'Post content goes here'}
      ]

      await Post.insertMany(mockPosts);

      const res = await request(app).get('/api/posts/')
                  .set('Accept', 'application/json');

      res.body.posts.forEach(post => {
        expect(post).not.toHaveProperty('createdAt');
        expect(post).not.toHaveProperty('updatedAt');
      });
    });
  });
});


describe('POST /api/posts/', () => {
  it('should return response status code 201', async () => {
    const mockPost = {
      title: 'Post #1',
      body: 'Post content goes here'
    };

    const res = await request(app).post('/api/posts/')
                      .send(mockPost)
                      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(201);
  });

  describe('Response body', () => {
    it('should be empty', async () => {
      const mockPost = {
        title: 'Post #1',
        body: 'Post content goes here'
      };

      const res = await request(app).post('/api/posts/')
                        .send(mockPost)
                        .set('Accept', 'application/json');
      expect(res.body).toEqual({});
    });
  });
});


describe('GET /api/posts/post/:ID', () => {
  it('should return response status code 200', async () => {
    const mockPost = {
      title: 'New Post',
      body: 'Post content goes here'
    };

    const post = new Post(mockPost);
    await post.save();

    const res = await request(app).get(`/api/posts/post/${post._id}`)
                      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
  });
});