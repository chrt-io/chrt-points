import * as chrt from 'chrt';
import chrtPoints from '~/chrtPoints'

describe('Testing chrtPoints', () => {
  test('Test getXScale', () => {
    const chart = chrt.Chrt()
                    .data([0,1,2,3,4,5])
    let points;
    chart.add(points = chrtPoints())

    const scale = points.getXScale();

    expect(scale).toBeDefined();
    expect(scale.getName()).toBeDefined();
    expect(scale.getName()).toBe('x');

  });
});
