import Chrt from 'chrt-core';
import chrtPoints from '~/chrtPoints'

describe('Testing chrtPoints', () => {
  test('Test getXScale', () => {
    const chart = Chrt()
                    .data([0,1,2,3,4,5])
    let points;
    chart.add(points = chrtPoints())

    const scale = points.getXScale();

    expect(scale).toBeDefined();
    expect(scale.getName()).toBeDefined();
    expect(scale.getName()).toBe('x');

  });

  test('Test getXScale', () => {
    const chart = Chrt().data([0,1,2,3,4,5]);

    const points = chrtPoints()

    points.parentNode = chart;

    const scale = points.getXScale();

    expect(scale).toBeDefined();
    expect(scale.getName()).toBeDefined();
    expect(scale.getName()).toBe('x');

  });
});
