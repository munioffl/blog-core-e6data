// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { setupSwagger } from './utils/swagger';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Setup Swagger
setupSwagger(app);
// check http://localhost:3000/api-docs/ for the api documentation

// Defining routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

export default app;
