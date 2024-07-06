// src/controllers/postController.ts
import { Request, Response } from 'express';
import { Post } from '../models/post';
import { statusCodes } from '../utils/statusCodes';

export const getAllPosts = async (req: Request, res: Response) => {
    const { author, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query: any = {};
  
    if (author) {
      query.author = author;
    }
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
    }
  
    try {
      const posts = await Post.find(query)
        .skip((page as number - 1) * (limit as number))
        .limit(limit as number);
  
      const total = await Post.countDocuments(query);
  
      res.status(statusCodes.OK).json({ posts, total, page, limit });
    } catch (error : any) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'Post not found' });
    }
    res.status(statusCodes.OK).json(post);
  } catch (error : any) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(statusCodes.CREATED).json(newPost);
  } catch (error : any) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body,  { new: true });
    if (!post) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'Post not found' });
    }
    res.status(statusCodes.OK).json(post);
  } catch (error : any) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'Post not found' });
    }
    res.status(statusCodes.NO_CONTENT).send();
  } catch (error : any) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
