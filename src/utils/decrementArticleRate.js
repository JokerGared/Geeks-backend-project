import { Article } from '../db/models/article.js';

export const decrementArticleRate = async (articleId) => {
  await Article.updateOne({ _id: articleId }, { $inc: { rate: -1 } });
};
