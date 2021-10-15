export function errorMiddleware(error, req, res, next) {
  return res
    .status(error?.status || 500)
    .send(error?.message || "unexpected error");
}
