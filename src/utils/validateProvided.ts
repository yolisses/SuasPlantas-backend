import { error } from './error';

export function validateProvided(values:{[key:string]:any}) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in values) {
    if (values[key] === null || values[key] === undefined) {
      error(400, `${key} not provided`);
    }
  }
}
