import { SORT_ORDER } from '../constants/index.js';
import { Article } from '../db/models/article.js';
import { User } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllArticles = async ({
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const offset = (page - 1) * perPage;

  const articlesQuery = Article.find();

  const [articlesCount, articles] = await Promise.all([
    Article.find().merge(articlesQuery).countDocuments(),
    articlesQuery
      .skip(offset)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .populate('ownerId', 'name avatarUrl')
      .exec(),
  ]);

  const paginationData = calculatePaginationData(articlesCount, page, perPage);

  return {
    articles,
    ...paginationData,
  };
};

export const getArticleById = async (articleId) => {
  const article = await Article.findById(articleId).populate('ownerId', 'name');
  return article;
};

export const createArticle = async (payload, ownerId) => {
  const article = await Article.create({
    ...payload,
    ownerId,
  });
  return article;
};

export const updateArticle = async (
  articleId,
  payload,
  ownerId,
  options = {},
) => {
  const result = await Article.findOneAndUpdate(
    {
      _id: articleId,
      ownerId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return {
    article: result.value,
  };
};

export const deleteArticle = async (articleId, ownerId) => {
  const article = await Article.findOneAndDelete({
    _id: articleId,
    ownerId,
  });
  return article;
};

export const updateArticlesAmount = async (ownerId) => {
  const articlesAmount = await Article.countDocuments({ ownerId });
  await User.findByIdAndUpdate(ownerId, { articlesAmount });
};

export const getPopularArticles = async () => {
  const topArticles = await Article.find()
    .sort({ rate: SORT_ORDER.DESC })
    .limit(12)
    .exec();

  return {
    articles: topArticles,
  };
};
