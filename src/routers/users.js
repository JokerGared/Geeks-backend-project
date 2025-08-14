import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addArticleToSavedController,
  deleteArticleFromSavedController,
  getAuthorsController,
  getSavedArticlesController,
  getSubscriptionsController,
  getUserArticlesController,
  getUserByIdController,
  subscribeToAuthorController,
  unsubscribeFromAuthorController,
  updateUserController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/usersSchema.js';
import { upload } from '../middlewares/multer.js';

const userRouter = Router();

userRouter.get('/users', ctrlWrapper(getAuthorsController));

userRouter.get(
  '/users/:userId',
  isValidId('userId'),
  ctrlWrapper(getUserByIdController),
);

userRouter.get(
  '/users/me/saved-articles',
  authenticate,
  ctrlWrapper(getSavedArticlesController),
);

userRouter.get(
  '/users/:userId/user-articles',
  isValidId('userId'),
  ctrlWrapper(getUserArticlesController),
);

userRouter.put(
  '/users/me/saved-articles/:articleId',
  authenticate,
  isValidId('articleId'),
  ctrlWrapper(addArticleToSavedController),
);

userRouter.delete(
  '/users/me/saved-articles/:articleId',
  authenticate,
  isValidId('articleId'),
  ctrlWrapper(deleteArticleFromSavedController),
);

userRouter.post(
  '/users/:authorId/subscribe',
  authenticate,
  isValidId('authorId'),
  ctrlWrapper(subscribeToAuthorController),
);

userRouter.delete(
  '/users/:authorId/unsubscribe',
  authenticate,
  isValidId('authorId'),
  ctrlWrapper(unsubscribeFromAuthorController),
);

userRouter.get(
  '/users/me/subscriptions',
  authenticate,
  ctrlWrapper(getSubscriptionsController),
);

userRouter.patch(
  '/users/me',
  authenticate,
  upload.single('avatar'),
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default userRouter;
