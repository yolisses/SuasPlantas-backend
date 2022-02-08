import { getRandomInt } from '../utils/getRandomInt';

export function getNewPreviewCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars[getRandomInt(0, chars.length)];
  }
  return result;
}
