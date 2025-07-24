import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from '../services/articles';

export const getAllArticlesController = async () => {
  await getAllArticles();
};

export const getArticleByIdController = async () => {
  await getArticleById();
};

export const createArticleController = async () => {
  await createArticle();
};

export const updateArticleController = async () => {
  await updateArticle();
};

export const deleteArticleController = async () => {
  await deleteArticle();
};
