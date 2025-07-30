import { User } from '../db/models/user.js';
import { Article } from '../db/models/article.js';
import { ARTICLES, SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

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

  const paginationData = calculatePaginationData(articlesCount, page, perPage);

  return {
    data: articles,
    ...paginationData,
  };
};

export const addArticleToSaved = async (userId, articleId) => {
  const article = await Article.findById(articleId);

  if (!article) {
    return { code: 404, error: 'Article not found' };
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { savedArticles: articleId },
    },
    { new: true },
  );

  if (!user) return { code: 404, error: 'User not found' };

  article.rate += 1;
  await article.save();

  return user;
};

export const deleteArticleFromSaved = async (userId, articleId) => {
  const article = await Article.findById(articleId);

  if (!article) {
    return { code: 404, error: 'Article not found' };
  }

  const user = await User.findById(userId).select('savedArticles');

  if (!user) {
    return { code: 404, error: 'User not found' };
  }

  const isSaved = user.savedArticles.includes(articleId);

  if (!isSaved) {
    return {
      code: 400,
      error: 'Article is not saved by this user',
    };
  }

  article.rate -= 1;
  await article.save();

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

  const paginationData = calculatePaginationData(authorsCount, page, perPage);

  return {
    data: authors,
    ...paginationData,
  };
};
