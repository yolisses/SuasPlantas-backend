import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

export async function verifyGoogleToken(idToken: string) {
  const ticket = await client.verifyIdToken({ idToken });
  return ticket.getPayload();
}
