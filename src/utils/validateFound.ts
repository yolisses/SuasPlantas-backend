import { error } from './error';

export function validateFound(values:{[key:string]:any}) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in values) {
    if (values[key] === null || values[key] === undefined) {
      error(404, `${key} not found`);
    }
  }
}
