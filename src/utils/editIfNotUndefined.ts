/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
export function editIfNotUndefined(obj :any, values:{[key:string]:any}) {
  for (const key in values) {
    if (values[key] !== undefined) {
      obj[key] = values[key];
    }
  }
}
