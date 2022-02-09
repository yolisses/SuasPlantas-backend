import uuid from 'uuid-random';
import { Request } from 'express';
import { getNewUploadLink } from './getNewUploadLink';
import { validateAuthenticated } from '../utils/validateAuthenticated';

export const UploadController = {
  async imageLink(req:Request, res) {
    validateAuthenticated(req);
    const key = uuid();
    const uploadLink = await getNewUploadLink(key, req.session.userId);
    return res.send({ uploadLink, key });
  },
};
