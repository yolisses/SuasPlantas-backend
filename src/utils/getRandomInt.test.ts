import { getRandomInt } from './getRandomInt';

it('should return numbers between the interval', () => {
  const min = 4;
  const max = 6;
  const numbers = [];
  for (let i = 0; i < 10; i++) {
    numbers.push(getRandomInt(min, max));
  }
  let containOutside = false;
  numbers.forEach((number) => {
    if (number < min || number > max) containOutside = true;
  });
  expect(containOutside).toBeFalsy();
});
