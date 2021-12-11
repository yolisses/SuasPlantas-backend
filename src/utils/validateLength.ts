import { error } from './error';

export function validateLength(name:string, value:any[], min:Number, max:Number) {
  if (value.length < min) error(400, `${name} length smaller than ${min}`);
  if (value.length > max) error(400, `${name} length bigger than ${max}`);
}
