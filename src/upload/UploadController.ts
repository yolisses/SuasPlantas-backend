import uuid from 'uuid-random';
import { Request } from 'express';
import { AWS_BUCKET_PATH } from '../config/env';
import { getNewUploadLink } from './getNewUploadLink';
import { validateAuthenticated } from '../utils/validateAuthenticated';

export const UploadController = {
  async imageLink(req:Request, res) {
    validateAuthenticated(req);
    const key = uuid();
    const uri = `${AWS_BUCKET_PATH}/uploads/${key}`;
    const uploadLink = await getNewUploadLink(key, req.userId);
    return res.send({ uploadLink, uri });
  },
};
