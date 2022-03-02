import { ParsedQs } from 'qs';

export function int(value:string | string[] | ParsedQs | ParsedQs[]) {
  return parseInt(value as string, 10);
}
