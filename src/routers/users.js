import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addArticleToSavedController,
  deleteArticleFromSavedController,
  getSavedArticlesController,
  getUserArticlesController,
  getUserByIdController,
} from '../controllers/users.js';

const userRouter = Router();

userRouter.use('/users/:userId', isValidId('userId'));

userRouter.get('/users/:userId', ctrlWrapper(getUserByIdController));

userRouter.get(
  '/users/:userId/saved-articles',
  authenticate,
  ctrlWrapper(getSavedArticlesController),
);
userRouter.get(
  '/users/:userId/user-articles',
  ctrlWrapper(getUserArticlesController),
);

userRouter.put(
  '/users/:userId/saved-articles/:articleId',
  authenticate,
  isValidId('articleId'),
  ctrlWrapper(addArticleToSavedController),
);

userRouter.delete(
  '/users/:userId/saved-articles/:articleId',
  authenticate,
  isValidId('articleId'),
  ctrlWrapper(deleteArticleFromSavedController),
);

export default userRouter;
