// src/server.ts
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT ?? 3000;

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

