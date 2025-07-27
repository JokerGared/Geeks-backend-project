import { User } from '../db/models/user.js';
import { Article } from '../db/models/article.js';
import { ARTICLES, SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

export const getUserById = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

export const getArticles = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.DESC,
  sortBy = 'rate',
  userId,
  typeOfArticles,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const user = await User.findById(userId);

  if (!user) {
    return { code: 404, error: 'User not found' };
  }

  let articlesQuery;

  if (typeOfArticles === ARTICLES.SAVED) {
    articlesQuery = Article.find({
      _id: { $in: user.savedArticles },
    }).populate('ownerId');
  } else if (typeOfArticles === ARTICLES.CREATED) {
    articlesQuery = Article.find({ ownerId: userId });
  } else {
    return {
      code: 400,
      error:
        'The type of articles was not provided. Please, specify whether the articles are saved or created.',
    };
  }

  const articlesCount = await Article.find()
    .merge(articlesQuery)
    .countDocuments();

  const articles = await articlesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(articlesCount, perPage, page);

  if (page > paginationData.totalPages && paginationData.totalPages > 0) {
    return {
      data: [],
      ...paginationData,
      message: `No articles found on page ${page}`,
    };
  }

  return {
    data: articles,
    ...paginationData,
  };
};

export const addArticleToSaved = async (userId, articleId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { savedArticles: articleId },
    },
    { new: true },
  );
};

export const deleteArticleFromSaved = async (userId, articleId) => {
  const user = await User.findById(userId).select('savedArticles');

  if (!user) {
    return createHttpError({ code: 404, error: 'User not found' });
  }

  const isSaved = user.savedArticles.includes(articleId);

  if (!isSaved) {
    return createHttpError({
      code: 400,
      error: 'Article is not saved by this user',
    });
  }

  const result = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { savedArticles: articleId },
    },
    { new: true },
  );

  return result;
};

export const getAuthors = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const ownersIds = await Article.distinct('ownerId');
  const authorsQuery = User.find({ _id: { $in: ownersIds } });

  const authorsCount = await User.find().merge(authorsQuery).countDocuments();

  const authors = await authorsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(authorsCount, perPage, page);

  if (page > paginationData.totalPages && paginationData.totalPages > 0) {
    return {
      data: [],
      ...paginationData,
      message: `No authors found on page ${page}`,
    };
  }

  return {
    data: authors,
    ...paginationData,
  };
};
