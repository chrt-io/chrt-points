import { isNull, hasData } from '~/helpers';

describe('Testing misc functions', () => {
  test('null is null', () => {
    expect(isNull(null)).toBe(true);
  });

  test('Test if an object should have data', () => {
    expect(hasData({ type: 'chrt' })).toBe(true);
  });

  test('Test if an object should not have data', () => {
    expect(hasData({ type: 'custom-no-data' })).toBe(false);
  });
});
