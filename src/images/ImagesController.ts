import { Request, Response } from 'express';
import { getImagesSuggestions } from './getImagesSuggestions';

export const ImagesController = {
  async suggest(req:Request, res:Response) {
    const { text } = req.query;
    res.send(await getImagesSuggestions(text as string));
  },
};
