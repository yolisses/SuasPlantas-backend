import { Request, Response } from 'express';
import { addFeedback } from './FeedbackService';

export const FeedbackController = {
  async add(req:Request, res:Response) {
    const { ip } = req;
    const { userId } = req.session;
    const feedback = await addFeedback(req.body, userId, ip);
    return res.send(feedback);
  },
};
