import request from 'supertest';
import app from '../src/app';
import { Post } from '../src/models/post';
import mongoose from 'mongoose';

beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI as string;
    mongoose.connect(mongoUri).then(() => {
      console.log('Connected to MongoDB');
    }).catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
  });

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Post API', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    token = res.body.token;
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        author: 'testuser',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all posts', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('posts');
  });

  it('should get a post by ID', async () => {
    const post = await Post.findOne({ title: 'Test Post' });
    const res = await request(app)
      .get(`/posts/${post?._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should update a post', async () => {
    const post = await Post.findOne({ title: 'Test Post' });
    const res = await request(app)
      .put(`/posts/${post?._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Post',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Post');
  });

  it('should delete a post', async () => {
    const post = await Post.findOne({ title: 'Updated Test Post' });
    const res = await request(app)
      .delete(`/posts/${post?._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});