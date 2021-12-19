import { Request } from 'express';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { generateUploadLink } from './UploadService';

export const UploadController = {
  async imageLink(req:Request, res) {
    validateAuthenticated(req);
    const uploadLink = await generateUploadLink(req.session.userId);
    return res.send(uploadLink);
  },
};
