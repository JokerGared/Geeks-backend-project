import { model, Schema } from 'mongoose';

const articlesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    // ownerId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'user',
    //   required: true,
    // },
    desc: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

export const Article = model('article', articlesSchema);
