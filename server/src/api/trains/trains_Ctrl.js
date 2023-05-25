import Train from '../../models/train';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';


const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getTaskById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
      ctx.status = 400; // Bad Request
      return;
    }
    try {
      const train = await Train.findById(id);
      // Task가 존재하지 않을 때
      if (!train) {
        ctx.status = 404; // Not Found
        return;
      }
      ctx.state.train = train;
      return next();
    } catch (e) {
      ctx.throw(500, e);
    }
  };