// src/routes/postRoutes.ts
import { Router } from 'express';
import { authenticateJWT, authorizeRole } from '../middlewares/authMiddleware';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController';

const router = Router();

router.get('/', authenticateJWT, getAllPosts);
router.get('/:id', authenticateJWT, getPostById);
router.post('/', authenticateJWT, authorizeRole(['admin', 'writer']), createPost);
router.put('/:id', authenticateJWT, authorizeRole(['admin', 'writer']), updatePost);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), deletePost);

export default router;
