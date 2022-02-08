import { getNewPreviewCode } from './getNewPreviewCode';

it('should return a valid preview code', () => {
  const code = getNewPreviewCode();
  const validRegex = /[0-9a-zA-Z]{6}/;

  const valid = validRegex.test(code);

  expect(valid).toBeTruthy();
});
