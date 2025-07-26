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

export const createArticle = async () => {};

export const updateArticle = async () => {};

export const deleteArticle = async () => {};
