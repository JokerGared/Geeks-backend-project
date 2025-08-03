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
      default: () => new Date().toISOString().split('T')[0],
    },
    rate: {
      type: Number,
      default: 0,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    desc: {
      type: String,
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        if (ret.date) {
          ret.date = ret.date.toISOString().split('T')[0];
        }
        return ret;
      },
    },
  },
);

articlesSchema.index({ title: 'text', desc: 'text', article: 'text' });

export const Article = model('article', articlesSchema);
