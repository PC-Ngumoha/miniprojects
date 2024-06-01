const request = require('supertest');
const mongoose = require('mongoose');
const { Post } = require('../models/post');
const { app, server } = require('../src/app');
const { uploadToCloudinary } = require('../utils/helpers');

jest.mock('../utils/helpers'); // Mocking the whole module.

afterAll(async () => {
  // Disconnect from test DB
  await mongoose.disconnect();
  server.close();
});

beforeEach(async () => {
  // Clear DB after each test run
  uploadToCloudinary.mockClear();
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

    it('should only return five posts without explicit pagination',
      async () => {
        const mockPost = {
          title: 'New Post',
          body: 'Post content goes here',
        }
        let post;
        for (let i = 0; i < 8; i++) {
          post = new Post(mockPost);
          await post.save();
        }

        const res = await request(app).get('/api/posts/')
                          .set('Accept', 'application/json');

        expect(res.body.posts.length).toEqual(5);
    });

    it('should return desired number of posts using pagination',
      async () => {
        const mockPost = {
          title: 'New Post',
          body: 'Post content goes here',
        };
        let post;
        for (let i = 0; i < 8; i++) {
          post = new Post(mockPost);
          await post.save();
        }
        const LIMIT = 4;

        const res = await request(app).get(`/api/posts/?limit=${LIMIT}`)
                          .set('Accept', 'application/json');

        expect(res.body.posts.length).toEqual(LIMIT);
      });

    it('should be able to filter posts by title', async () => {
      const mockPosts = [
        {title: 'Post #1', body: 'Post content goes here'},
        {title: 'Post #2', body: 'Post content goes here'},
        {title: 'Something', body: 'Post content goes here'},
      ]

      await Post.insertMany(mockPosts);

      const res = await request(app).get('/api/posts/?search=post')
                  .set('Accept', 'application/json');

      expect(res.body.posts.length).toEqual(2);
      res.body.posts.forEach((post, idx) => {
        expect(post.title).toEqual(mockPosts[idx].title);
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

  describe('Response effect', () => {
    it('should allow post creation with thumbnail', async () => {
      const mockResult = {
        secure_url: 'https://res.cloudinary.com/mock-url',
      };
      uploadToCloudinary.mockResolvedValue(mockResult);

      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here',
      }

      const res = await request(app).post('/api/posts/')
                  .field('title', mockPost.title)
                  .field('body', mockPost.body)
                  .attach('thumbnail', Buffer.from('An image'), {
                    filename: 'test.jpg',
                    contentType: 'image/jpeg'
                  });

      expect(res.statusCode).toEqual(201);

      const posts = await Post.find({ title: mockPost.title });
      expect(posts[0]).toHaveProperty('thumbnail', mockResult.secure_url);
      expect(uploadToCloudinary).toHaveBeenCalledTimes(1);
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

  describe('Response body', () => {
    it('should be an object', async () => {
      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here'
      };

      const post = new Post(mockPost);
      await post.save();

      const res = await request(app).get(`/api/posts/post/${post._id}`)
                        .set('Accept', 'application/json');
      expect(res.body instanceof Object).toBe(true);
    });

    it('should have all model fields', async () => {
      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here'
      };

      const post = new Post(mockPost);
      await post.save();

      const res = await request(app).get(`/api/posts/post/${post._id}`)
                        .set('Accept', 'application/json');
      const body = res.body.post;
      expect(body).toHaveProperty('_id');
      expect(body).toHaveProperty('title');
      expect(body).toHaveProperty('body');
      expect(body).toHaveProperty('createdAt');
      expect(body).toHaveProperty('updatedAt');
    });
  });
});


describe('PATCH /api/posts/post/:ID', () => {
  it('should return response status code 200', async () => {
      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here'
      };

      const modifications = {title: 'Old Post'};

      const post = new Post(mockPost);
      await post.save();

      const res = await request(app).patch(`/api/posts/post/${post._id}`)
                        .send(modifications)
                        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
  });

  describe('Response Body', () => {
    it('should be empty', async () => {
      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here'
      };

      const modifications = {title: 'Old Post'};

      const post = new Post(mockPost);
      await post.save();

      const res = await request(app).patch(`/api/posts/post/${post._id}`)
                        .send(modifications)
                        .set('Accept', 'application/json');

      expect(res.body).toEqual({});
    });
  });

  describe('Response effect', () => {
    it('should update content of actual post', async () => {
      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here'
      };

      const modifications = {title: 'Old Post'};

      let post = new Post(mockPost);
      const postId = post._id;
      await post.save();

      const res = await request(app).patch(`/api/posts/post/${postId}`)
                        .send(modifications)
                        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);

      post = (await Post.find({ _id: postId }))[0];

      expect(post.title).not.toEqual(mockPost.title);
      expect(post.title).toEqual(modifications.title);
    });

    it('should allow update of thumbnail for a post', async () => {
      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here'
      };

      const mockResult = {
        secure_url: 'https://res.cloudinary.com/mock-url',
      };

      uploadToCloudinary.mockResolvedValue(mockResult);

      const modifications = {title: 'Old Post'};

      let post = new Post(mockPost);
      const postId = post._id;
      await post.save();

      expect(post).toHaveProperty('thumbnail', undefined);

      await request(app).patch(`/api/posts/post/${postId}`)
            .field('title', modifications.title)
            .attach('thumbnail', Buffer.from('An Image'), {
              filename: 'test.png',
              contentType: 'image/png'
            });

      post = await Post.find({ _id: postId });

      expect(post[0].title).toEqual(modifications.title);
      expect(post[0]).toHaveProperty('thumbnail', mockResult.secure_url);
      expect(uploadToCloudinary).toHaveBeenCalledTimes(1);
    });
  });
});


describe('DELETE /api/posts/post/:ID', () => {
  it('should return response status code 204', async () => {
    const mockPost = {
      title: 'New Post',
      body: 'Post content goes here'
    };

    const post = new Post(mockPost);
    await post.save();

    const res = await request(app).delete(`/api/posts/post/${post._id}`);

    expect(res.statusCode).toEqual(204);
  });

  describe('Response effect', () => {
    it('should remove specific post from DB', async () => {
      const mockPost = {
        title: 'New Post',
        body: 'Post content goes here'
      };

      let post = new Post(mockPost);
      const postId = post._id;
      await post.save();

      await request(app).delete(`/api/posts/post/${postId}`);

      post = await Post.find({ _id: postId })[0];

      expect(post).toBeUndefined();
    });
  });
});