import { User } from './User';
import { Provider } from './Provider';
import { getPoint } from '../location/getPoint';
import { getUserByEmail } from './getUserByEmail';
import { setUserPreview } from '../preview/setUserPreview';
import { validateWithProvider } from './validateWithProvider';
import { findLocationByIp } from '../location/findLocationByIp';

interface SignInParams{
accessToken :string
provider:Provider
ip:string
}

const validIpRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export async function signIn({ provider, accessToken, ip }:SignInParams) {
  const { email, name, picture } = await validateWithProvider(provider, accessToken);

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

  if (!user.ip && validIpRegex.test(ip) && (ip !== '127.0.0.1')) {
    user.ip = ip;
    await user.save();
  }

  if (user.deletedAt) {
    await setUserPreview(user.id, true);
  }

  return user;
}
