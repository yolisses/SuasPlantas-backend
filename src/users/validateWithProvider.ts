import { validateWithFacebook } from '../signIn/validateWithFacebook';
import { validateWithGoogle } from '../signIn/validateWithGoogle';

const validateWith = {
  google: validateWithGoogle,
  facebook: validateWithFacebook,
}as const;

export async function validateWithProvider(provider, acessToken) {
  return validateWith[provider](acessToken);
}
