import { User } from './User';
import { Provider } from './Provider';
import { getUserByEmail } from './getUserByEmail';
import { validateWithProvider } from './validateWithProvider';
import { mutateUserWithIpInfo } from './mutateUserWithIpInfo';

interface SignInParams{
  ip:string
  provider:Provider
  accessToken:string
}

export async function signIn({
  ip,
  provider,
  accessToken,
}:SignInParams) {
  const providerData = await validateWithProvider(provider, accessToken);

  let user: User;
  user = await getUserByEmail(providerData.email);
  if (!user) {
    user = User.create({
      name: providerData.name,
      image: providerData.picture,
    });
  }

  if (!user.email) user.email = providerData.email;
  await mutateUserWithIpInfo(user, ip);

  user = await user.save();

  return user;
}
