import { AUTH_SECRET } from "env/env";
import { sign } from "jsonwebtoken";

export function generateToken(params = {}) {
  const secret = AUTH_SECRET;
  const oneWeek = 60 * 60 * 24 * 7;
  return sign(params, secret, {
    expiresIn: oneWeek,
  });
}
