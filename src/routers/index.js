import { Router } from 'express';
import authRouter from './auth.js';
import articlesRouter from './articles.js';
import userRouter from './users.js';

const router = Router();
router.use(articlesRouter);
router.use(authRouter);
router.use(userRouter);

export default router;
