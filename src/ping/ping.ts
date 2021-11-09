import { Request, Response, Router } from 'express';

export const pingRoutes = Router();

const ping = (req:Request, res:Response) => {
  const { body, params, query } = req;
  res.send({ body, params, query });
};

pingRoutes.get('/', ping);
pingRoutes.post('/', ping);
