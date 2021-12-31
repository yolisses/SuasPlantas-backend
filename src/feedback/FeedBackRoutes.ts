import { Router } from 'express';
import { FeedbackController } from './FeedbackController';

export const feedbackRoutes = Router();

feedbackRoutes.post('/', FeedbackController.add);
