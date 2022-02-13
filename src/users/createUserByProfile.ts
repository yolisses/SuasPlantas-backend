import { getNewPreviewCode } from '../preview/getNewPreviewCode';
import { User } from './User';

interface CreateUserByProfileDTO{
  name:string
  fbId?:string
  image:string
  city?:string
  state?:string
}

export async function createUserByProfile({
  name, image, city, state, fbId,
}:CreateUserByProfileDTO) {
  const user = await User.create({
    name,
    image,
    city: city || undefined,
    fbId: fbId || undefined,
    state: state || undefined,
    preview: getNewPreviewCode(),
  }).save();
  // return user.softRemove();
  return user;
}
