export async function authMiddleware(req, res, next) {
  // const authHeader = req.headers.authorization;
  // const decoded = await decodeToken(authHeader);
  // req.userId = decoded.id;
  next();
}
