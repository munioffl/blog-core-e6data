import request from 'supertest';
import app from '../src/app';
import mongoose, { ConnectOptions } from 'mongoose';

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

describe('Auth Controller', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser1',
                password: 'password123',
                role: 'admin',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should login the user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
