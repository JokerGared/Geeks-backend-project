import createHttpError from 'http-errors';
import {
  addArticleToSaved,
  deleteArticleFromSaved,
  getArticles,
  getAuthors,
  getUserById,
  getUserSubscriptions,
  subscribeToAuthor,
  unsubscribeFromAuthor,
  updateUser,
} from '../services/users.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { ARTICLES } from '../constants/index.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found a user with id ${userId}!`,
    data: user,
  });
};

export const getSavedArticlesController = async (req, res, next) => {
  console.log('req.user:', req.user);
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const userId = req.user._id;

  const result = await getArticles({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
    typeOfArticles: ARTICLES.SAVED,
  });

  if (result.error) {
    next(createHttpError(result.code, result.error));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found saved articles!',
    data: result,
  });
};

export const getUserArticlesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { userId } = req.params;

  const result = await getArticles({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
    typeOfArticles: ARTICLES.CREATED,
  });

  if (result.error) {
    next(createHttpError(result.code, result.error));
    return;
  }

  res.status(200).json({
    status: 200,
    message: "Successfully found user's articles!",
    data: result,
  });
};

export const addArticleToSavedController = async (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  const result = await addArticleToSaved(userId, articleId);

  if (result.error) {
    next(createHttpError(result.code, result.error));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully saved the article!`,
  });
};

export const deleteArticleFromSavedController = async (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  const result = await deleteArticleFromSaved(userId, articleId);

  if (result.error) {
    next(createHttpError(result.code, result.error));
    return;
  }

  res.status(204).send();
};

export const getAuthorsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const authors = await getAuthors({
    page,
    perPage,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found authors!',
    data: authors,
  });
};

export const subscribeToAuthorController = async (req, res, next) => {
  const userId = req.user._id;
  const { authorId } = req.params;

  const result = await subscribeToAuthor(userId, authorId);

  if (result.error) {
    next(createHttpError(result.code, result.error));
    return;
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully subscribed to author!',
    data: result,
  });
};

export const unsubscribeFromAuthorController = async (req, res, next) => {
  const userId = req.user._id;
  const { authorId } = req.params;

  const result = await unsubscribeFromAuthor(userId, authorId);

  if (result.error) {
    next(createHttpError(result.code, result.error));
    return;
  }

  res.status(204).send();
};

export const getSubscriptionsController = async (req, res, next) => {
  const userId = req.user._id;

  const result = await getUserSubscriptions(userId);

  if (result.error) {
    next(createHttpError(result.code, result.error));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully fetched subscriptions!',
    data: result,
  });
};

export const updateUserController = async (req, res) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);
  const userId = req.user._id;
  const img = req.file;
  let avatarUrl;

  if (img) {
    console.log('Uploading to Cloudinary...');
    avatarUrl = await saveFileToCloudinary(img);
    console.log('Upload done:', avatarUrl);
  }
  console.log('AFTER SAVE FILE');
  console.log('PAYLOAD:', { ...req.body, avatarUrl });
  const user = await updateUser(userId, { ...req.body, avatarUrl });

  if (!user) throw createHttpError(404, 'User not found');

  res.json({
    status: 200,
    message: 'Successfully updated a user!',
    data: user,
  });
};
