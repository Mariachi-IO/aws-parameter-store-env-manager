import { Greeter } from '../configure';
test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});
