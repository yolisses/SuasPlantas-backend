import { createUser } from './createUser';
import { getPoint } from '../location/getPoint';
import { getUserByEmail } from './getUserByEmail';
import { findLocationByIp } from '../location/findLocationByIp';
import { validateWithGoogle } from '../signIn/validateWithGoogle';
import { validateWithFacebook } from '../signIn/validateWithFacebook';

interface SignInParams{
accessToken :string
provider:'google'|'facebook'
ip:string
}

const validateWith = {
  google: validateWithGoogle,
  facebook: validateWithFacebook,
} as const;

export async function signIn({ accessToken, provider, ip }:SignInParams) {
  const { email, name, picture } = await validateWith[provider](accessToken);

  let user = await getUserByEmail(email);

  if (!user) {
    const locationData = await findLocationByIp(ip);
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
