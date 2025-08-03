import createHttpError from 'http-errors';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  getPopularArticles,
  updateArticle,
  updateArticlesAmount,
} from '../services/articles.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllArticlesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);

  const articles = await getAllArticles({
    page,
    perPage,
    sortOrder,
    sortBy,
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
  const ownerId = req.user._id;
  const img = req.file;

  if (!img) {
    throw createHttpError(400, 'Image is required');
  }

  const imgUrl = await saveFileToCloudinary(img);

  const article = await createArticle({ ...req.body, img: imgUrl }, ownerId);

  await updateArticlesAmount(ownerId);

  res.status(201).json({
    status: 201,
    message: 'Successfully created an article',
    data: article,
  });
};

export const updateArticleController = async (req, res) => {
  const { articleId } = req.params;
  const img = req.file;
  let imgUrl;

  if (img) {
    imgUrl = await saveFileToCloudinary(img);
  }

  const result = await updateArticle(
    articleId,
    { ...req.body, img: imgUrl },
    req.user._id,
  );

  if (!result) throw createHttpError(404, 'Article not found');

  res.json({
    status: 200,
    message: 'Successfully updated an article',
    data: result.article,
  });
};

export const deleteArticleController = async (req, res) => {
  const { articleId } = req.params;
  const ownerId = req.user._id;
  const article = await deleteArticle(articleId, req.user._id);

  if (!article) throw createHttpError(404, 'Article not found');

  await updateArticlesAmount(ownerId);

  res.status(204).send();
};

export const getPopularArticlesController = async (req, res) => {
  const articles = await getPopularArticles();

  res.json({
    status: 200,
    message: 'Successfully found popular articles!',
    data: articles,
  });
};
