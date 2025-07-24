import {
  addArticleToSaved,
  deleteArticleFromSaved,
  getSavedArticles,
  getUserArticles,
  getUserById,
} from '../services/users.js';

export const getUserByIdController = async () => {
  await getUserById();
};

export const getSavedArticlesController = async () => {
  await getSavedArticles();
};

export const getUserArticlesController = async () => {
  await getUserArticles();
};

export const addArticleToSavedController = async () => {
  await addArticleToSaved();
};

export const deleteArticleFromSavedController = async () => {
  await deleteArticleFromSaved();
};
