import { createUser } from './createUser';
import { getUserByEmail } from './getUserByEmail';
import { User } from './User';
import { getLocationByIp } from '../location/getLocationByIp';
import { getPoint } from '../location/getPoint';
import { validateWithGoogle } from '../signIn/validateWithGoogle';

interface SignInParams{
accessToken :string
ip:string
}

export async function signIn({ accessToken, ip }:SignInParams) {
  const { email, name, picture } = await validateWithGoogle(accessToken);

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
