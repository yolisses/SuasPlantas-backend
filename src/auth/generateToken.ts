// Ridiculously necessary
import * as jwt from "jsonwebtoken";
const { sign } = jwt;

export function generateToken(params = {}) {
  const secret = process.env.AUTH_SECRET;
  const oneWeek = 60 * 60 * 24 * 7;
  return sign(params, secret, {
    expiresIn: oneWeek,
  });
}
