import { Request } from 'express';
import uuid from 'uuid-random';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { generateUploadLink } from './UploadService';

export const UploadController = {
  async imageLink(req:Request, res) {
    validateAuthenticated(req);
    const key = uuid();
    const uploadLink = await generateUploadLink(key, req.session.userId);
    return res.send({ uploadLink, key });
  },
};
