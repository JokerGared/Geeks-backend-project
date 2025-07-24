import { Router } from 'express';
import authRouter from './auth.js';
import articlesRouter from './articles.js';
import authorRouter from './authors.js';

const router = Router();
router.use(articlesRouter);
router.use(authRouter);
router.use(authorRouter);

export default router;
