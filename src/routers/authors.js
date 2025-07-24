import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addArticleToSavedController,
  deleteArticleFromSavedController,
  getAuthorArticlesController,
  getAuthorByIdController,
  getSavedArticlesController,
} from '../controllers/authors.js';

const authorRouter = Router();

authorRouter.use('/authors/:authorId', isValidId('authorId'));

authorRouter.get('/authors/:authorId', ctrlWrapper(getAuthorByIdController));

authorRouter.get(
  '/authors/:authorId/saved-articles',
  authenticate,
  ctrlWrapper(getSavedArticlesController),
);
authorRouter.get(
  '/authors/:authorId/author-articles',
  ctrlWrapper(getAuthorArticlesController),
);

authorRouter.put(
  '/authors/:authorId/saved-articles/:articleId',
  authenticate,
  isValidId('articleId'),
  ctrlWrapper(addArticleToSavedController),
);

authorRouter.delete(
  '/authors/:authorId/saved-articles/:articleId',
  authenticate,
  isValidId('articleId'),
  ctrlWrapper(deleteArticleFromSavedController),
);

export default authorRouter;
