import { createUser } from './createUser';
import { getPoint } from '../location/getPoint';
import { getUserByEmail } from './getUserByEmail';
import { findLocationByIp } from '../location/findLocationByIp';
import { validateWithGoogle } from '../signIn/validateWithGoogle';

interface SignInParams{
accessToken :string
ip:string
}

export async function signIn({ accessToken, ip }:SignInParams) {
  const { email, name, picture } = await validateWithGoogle(accessToken);

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
