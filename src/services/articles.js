import { Article } from '../db/models/article.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllArticles = async ({ page = 1, perPage = 10 }) => {
  const offset = (page - 1) * perPage;

  const articlesQuery = Article.find();

  const [articlesCount, articles] = await Promise.all([
    Article.find().merge(articlesQuery).countDocuments(),
    articlesQuery.skip(offset).limit(perPage).exec(),
  ]);

  const paginationData = calculatePaginationData(articlesCount, page, perPage);

  return {
    articles,
    ...paginationData,
  };
};

export const getArticleById = async (articleId) => {
  const article = await Article.findById(articleId);
  return article;
};

export const createArticle = async (payload, ownerId) => {
  const article = await Article.create({
    ...payload,
    /* ownerId */
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
      /* ownerId */
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
    /* ownerId ,*/
  });
  return article;
};
