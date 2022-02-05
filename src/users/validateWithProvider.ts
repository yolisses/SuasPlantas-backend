import { validateWithGoogle } from '../signIn/validateWithGoogle';
import { validateWithFacebook } from '../signIn/validateWithFacebook';
import { Provider } from './Provider';

const validateWith = {
  google: validateWithGoogle,
  facebook: validateWithFacebook,
} as const;

export async function validateWithProvider(provider:Provider, acessToken:string) {
  return validateWith[provider](acessToken);
}
