import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createArticleSchema,
  updateArticleSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import {
  createArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
} from '../controllers/articles.js';

const articlesRouter = Router();

articlesRouter.use('/articles/:articleId', isValidId('articleId'));

articlesRouter.get('/articles', ctrlWrapper(getAllArticlesController));

articlesRouter.get(
  '/articles/:articleId',
  ctrlWrapper(getArticleByIdController),
);

articlesRouter.post(
  '/articles',
  authenticate,
  upload.single('avatar'),
  validateBody(createArticleSchema),
  ctrlWrapper(createArticleController),
);

articlesRouter.patch(
  '/articles/:articleId',
  authenticate,
  upload.single('avatar'),
  validateBody(updateArticleSchema),
  ctrlWrapper(updateArticleController),
);

articlesRouter.delete(
  '/articles/:articleId',
  authenticate,
  ctrlWrapper(deleteArticleController),
);

export default articlesRouter;
