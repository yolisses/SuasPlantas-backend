import { User } from './User';
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

const validIpRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export async function signIn({ accessToken, provider, ip }:SignInParams) {
  const { email, name, picture } = await validateWith[provider](accessToken);

  let user = await getUserByEmail(email);

  if (!user) {
    const locationData = await findLocationByIp(ip);
    const {
      latitude, longitude, state, city,
    } = locationData;
    const location = getPoint({ latitude, longitude });
    user = await User.create({
      ip,
      name,
      city,
      email,
      state,
      location,
      image: picture,
    }).save();
  }
  console.log('ip', ip);

  if (!user.ip && validIpRegex.test(ip) && (ip !== '127.0.0.1')) {
    user.ip = ip;
    await user.save();
  }

  return user;
}
