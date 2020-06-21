import { getBaseLog } from '~/helpers';

test ('base 10 log of 1 should equals 0', () => {
  expect(getBaseLog(10,1)).toBe(0)
});
