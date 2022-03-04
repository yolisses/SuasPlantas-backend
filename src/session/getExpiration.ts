export function getExpiration(date:Date, timeToExpire:number) {
  const expiration = new Date(date);
  expiration.setSeconds(expiration.getSeconds() + timeToExpire);
  return expiration;
}
