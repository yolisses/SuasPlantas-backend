import { User } from './User';
import { Provider } from './Provider';
import { isValidIp } from './isValidIp';
import { getPoint } from '../location/getPoint';
import { getUserByEmail } from './getUserByEmail';
import { getLocationByIp } from '../location/getLocationByIp';
import { getUserByPreviewCode } from './getUserByPreviewCode';
import { validateWithProvider } from './validateWithProvider';
import { setUserPreview } from '../preview/setUserPreview';

interface SignInParams{
  ip:string
  provider:Provider
  accessToken:string
  previewCode?:string
}

export async function signIn({
  ip,
  provider,
  accessToken,
  previewCode,
}:SignInParams) {
  const providerData = await validateWithProvider(provider, accessToken);

  let user: User;
  console.log(previewCode);
  if (previewCode) {
    user = await getUserByPreviewCode(previewCode);
    console.log(user);
    user.email = providerData.email;
  } else {
    user = await getUserByEmail(providerData.email);
    if (!user) {
      user = await User.create({
        name: providerData.name,
        image: providerData.picture,
      });
    }
  }

  if (!user.email) user.email = providerData.email;
  if (isValidIp(ip)) {
    user.ip = ip;

    if (!user.location || !user.city || !user.city) {
      const {
        city,
        state,
        latitude,
        longitude,
      } = await getLocationByIp(ip);

      if (!user.city) user.city = city;
      if (!user.state) user.state = state;
      if (!user.location) user.location = getPoint({ latitude, longitude });
    }
  }

  user = await user.save();

  if (user.deletedAt) {
    user = await setUserPreview(user.id, true);
  }

  return user;
}
