import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/authorsSchema';

const authPage = Router();

authPage.post(
  '/auth/register',
  validateBody(registerUserSchema),
  registerUserController,
);

authPage.post(
  '/auth/login',
  validateBody(loginUserSchema),
  loginUserController,
);

authPage.post('/auth/logout', logoutUserController);

authPage.post('/auth/refresh', refreshUserSessionController);

export default authPage;
