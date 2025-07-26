import createHttpError from 'http-errors';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from '../services/articles.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllArticlesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const articles = await getAllArticles({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully found articles!',
    data: articles,
  });
};

export const getArticleByIdController = async (req, res) => {
  const { articleId } = req.params;
  const article = await getArticleById(articleId);

  if (!article) throw createHttpError(404, 'Article not found');

  res.json({
    status: 200,
    message: `Successfully found article with id ${articleId}!`,
    data: article,
  });
};

export const createArticleController = async (req, res) => {
  await createArticle();
};

export const updateArticleController = async (req, res) => {
  await updateArticle();
};

export const deleteArticleController = async (req, res) => {
  await deleteArticle();
};
