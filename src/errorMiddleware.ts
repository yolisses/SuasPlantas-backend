export function errosMiddleware(err, req, res, next) {
  console.error('middleware', err);
  next(err);
  return res.status(500).send('error');
}
