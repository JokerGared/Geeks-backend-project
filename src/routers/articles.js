import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createArticleSchema,
  updateArticleSchema,
} from '../validation/articlesSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import {
  createArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  getPopularArticlesController,
  updateArticleController,
} from '../controllers/articles.js';

const articlesRouter = Router();

articlesRouter.get('/articles', ctrlWrapper(getAllArticlesController));

articlesRouter.get(
  '/articles/popular',
  ctrlWrapper(getPopularArticlesController),
);

articlesRouter.get(
  '/articles/:articleId',
  isValidId('articleId'),
  ctrlWrapper(getArticleByIdController),
);

articlesRouter.post(
  '/articles',
  authenticate,
  upload.single('img'),
  validateBody(createArticleSchema),
  ctrlWrapper(createArticleController),
);

articlesRouter.patch(
  '/articles/:articleId',
  authenticate,
  isValidId('articleId'),
  upload.single('img'),
  validateBody(updateArticleSchema),
  ctrlWrapper(updateArticleController),
);

articlesRouter.delete(
  '/articles/:articleId',
  authenticate,
  isValidId('articleId'),
  ctrlWrapper(deleteArticleController),
);

export default articlesRouter;
