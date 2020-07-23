import { svgPath } from '~/layout';
import { lineCommand, bezierCommand } from '~/curves';

describe('Testing paths', () => {
  test('test simple path', () => {
    const path = svgPath(
      [
        [0, 0],
        [1, 10],
        [2, 20],
        [3, 20]
      ],
      lineCommand
    );
    expect(path).toStrictEqual(['M0,0', 'L1,10', 'L2,20', 'L3,20']);
  });

  test('test path with null values', () => {
    const path = svgPath(
      [
        [0, 0],
        [1, null],
        [2, 20],
        [3, 20]
      ],
      lineCommand
    );
    expect(path).toStrictEqual(['M0,0', 'M2,20', 'L3,20']);
  });

  test('test path with no values', () => {
    const path = svgPath([], lineCommand);
    expect(path).toStrictEqual([]);
  });

  test('test simple spline', () => {
    const path = svgPath(
      [
        [0, 0],
        [1, 10],
        [2, 20]
      ],
      bezierCommand
    );
    expect(path).toStrictEqual([
      'M0,0',
      'C 0.09999999999999988,0.9999999999999999 0.8,8 1,10',
      'C 1.1999999999999997,12 1.9,19 2,20'
    ]);
  });
});
