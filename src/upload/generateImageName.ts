import * as uuid from "uuid-random";

export function generateImageName() {
  return `${uuid()}.webp`;
}
