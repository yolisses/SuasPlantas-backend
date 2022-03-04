import { NODE_ENV } from '../config/env';

// eslint-disable-next-line no-unused-vars
export async function errorMiddleware(error, req, res, next) {
  if (NODE_ENV !== 'test') {
    console.error(error);
  }
  return res
    .status(error?.status || 500)
    .send(error?.message || 'unexpected error');
}
