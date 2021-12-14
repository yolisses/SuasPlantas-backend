import { OAuth2Client } from 'google-auth-library';
import { error } from '../utils/error';
import { ValidationResponse } from './ValidationResponse';

const client = new OAuth2Client();

// eslint-disable-next-line consistent-return
export async function validateWithGoogle(accessToken: string):Promise<ValidationResponse> {
  try {
    const ticket = await client.verifyIdToken({ idToken: accessToken });
    const { email, name, picture } = ticket.getPayload();
    return { email, name, picture };
  } catch (err) {
    error(400, err.message);
  }
}
