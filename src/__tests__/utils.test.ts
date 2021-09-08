import { getDate } from '../utils';

describe('utils.ts', () => {
  test('getDate - return a formated date', () => {
    expect(getDate(new Date())).toBeDefined();
  });
});
