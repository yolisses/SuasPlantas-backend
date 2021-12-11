import { UserId } from '../users/User';
import { error } from './error';

export function validateOwner(values:{[key:string]:any}, userId: UserId) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in values) {
    if (values[key].userId !== userId) error(403, `${key} edit by unauthorized user`);
  }
}
