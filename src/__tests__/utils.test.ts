import { getDate, paramAsNumber } from '../utils';

describe('utils.ts', () => {
  test('getDate - return a formated date', () => {
    expect(getDate(new Date())).toBeDefined();
  });

  test('paramAsNumber - return a number from a string', () => {
    expect(paramAsNumber('1')).toBe(1);
  });
});
