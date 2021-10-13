export function errorMiddleware(error, req, res, next) {
  return res.status(500).send('error');
}
