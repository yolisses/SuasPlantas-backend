import { verify } from 'jsonwebtoken';
import { error } from 'utils/error';

// const secret = process.env.AUTH_SECRET;
const secret = '42'

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

    verify(tokenValue, secret, (err, decoded) => {
        if (err) {
            error(401, '' + err);
        }
        return decoded;
    });
}
