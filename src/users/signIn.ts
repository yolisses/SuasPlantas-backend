import { TokenPayload } from 'google-auth-library';
import { createUser } from './createUser';
import { getUserByEmail } from './getUserByEmail';
import { User } from './User';
import { error } from '../utils/error';
import { getLocationByIp } from '../location/getLocationByIp';
import { getPoint } from '../location/getPoint';
import { verifyGoogleToken } from './verifyGoogleToken';

interface SignInParams{
accessToken :string
ip:string
}

export async function signIn({ accessToken, ip }:SignInParams) {
  let payload: TokenPayload;
  try {
    payload = await verifyGoogleToken(accessToken);
  } catch (err) {
    error(400, err.message);
  }
  const { email, name, picture } = payload;
  let user: User = await getUserByEmail(email);

  if (!user) {
    const locationData = await getLocationByIp(ip);
    const {
      latitude, longitude, state, city,
    } = locationData;
    const location = getPoint({ latitude, longitude });
    user = await createUser({
      name,
      city,
      email,
      state,
      location,
      image: picture,
    });
  }
  return user;
}
