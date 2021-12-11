import { verify } from 'jsonwebtoken';
import { error } from '../utils/error';
import { AUTH_SECRET } from '../env/env';

export async function decodeToken(token: string): Promise<any | void> {
  if (!token) {
    error(401, 'No token provided');
  }

  const parts = token.split(' ');
  if (parts.length !== 2) {
    error(401, 'Token with invalid number of segments');
  }

  const [scheme, tokenValue] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    error(401, 'Malformatted token');
  }

  try {
    const secret = AUTH_SECRET;
    const decoded = await new Promise(
      (resolve, reject) => verify(tokenValue, secret, (err, value) => {
        if (err) return reject(err);
        return resolve(value);
      }),
    );
    return decoded;
  } catch (err) {
    error(500, `${err}`);
  }
}
