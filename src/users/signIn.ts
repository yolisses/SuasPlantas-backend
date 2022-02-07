import { User } from './User';
import { Provider } from './Provider';
import { getUserByEmail } from './getUserByEmail';
import { getUserByPreviewId } from './getUserByPreviewId';
import { setUserPreview } from '../preview/setUserPreview';
import { validateWithProvider } from './validateWithProvider';
import { mutateUserWithIpInfo } from './mutateUserWithIpInfo';

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
  if (previewCode) {
    user = await getUserByPreviewId(previewCode);
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
  await mutateUserWithIpInfo(user, ip);

  user = await user.save();

  if (user.deletedAt) {
    user = await setUserPreview(user.id, true);
  }

  return user;
}
