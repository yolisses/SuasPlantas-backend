import { Image } from '../upload/Image';

export async function createImage(uri) {
  return Image.create({ uri }).save();
}
