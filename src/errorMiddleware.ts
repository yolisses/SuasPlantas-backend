// eslint-disable-next-line no-unused-vars
export function errorMiddleware(error, req, res, next) {
  console.error(error);
  return res
    .status(error?.status || 500)
    .send(error?.message || 'unexpected error');
}
