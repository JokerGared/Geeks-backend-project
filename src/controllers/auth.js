import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

const clearSessionCookies = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
};

export const registerUserController = async (req, res) => {
  const photo = req.file;
  let avatarUrl;

  if (photo) {
    avatarUrl = await saveFileToCloudinary(photo);
  }

  const user = await registerUser({
    ...req.body,
    avatar: avatarUrl,
  });

  const session = await loginUser({ email: user.email, password: req.body.password });
  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged in an user!',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  clearSessionCookies(res);

  res.status(204).send();
};



export const refreshSessionController = async (req, res, next) => {
  try {
    const session = await refreshSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    if (error.status === 401) {
      clearSessionCookies(res);
    }
    next(error);
  }
};
