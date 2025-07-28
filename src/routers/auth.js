import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/usersSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authPage = Router();

authPage.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authPage.post(
  '/auth/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authPage.post(
  '/auth/logout',
  ctrlWrapper(logoutUserController));

authPage.post(
  '/auth/refresh',
  ctrlWrapper(refreshSessionController));

export default authPage;
