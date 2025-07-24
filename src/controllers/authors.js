import {
  addArticleToSaved,
  deleteArticleFromSaved,
  getAuthorArticles,
  getAuthorById,
  getSavedArticles,
} from '../services/authors';

export const getAuthorByIdController = async () => {
  await getAuthorById();
};

export const getSavedArticlesController = async () => {
  await getSavedArticles();
};

export const getAuthorArticlesController = async () => {
  await getAuthorArticles();
};

export const addArticleToSavedController = async () => {
  await addArticleToSaved();
};

export const deleteArticleFromSavedController = async () => {
  await deleteArticleFromSaved();
};
