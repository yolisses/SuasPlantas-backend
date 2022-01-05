export function editIfNotUndefined(obj :any, values:{[key:string]:any}) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in values) {
    if (values[key] === undefined) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = values[key];
    }
  }
}
