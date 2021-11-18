import Chrt from 'chrt-core';
import chrtPoints from '~/chrtPoints'

describe('Testing chrtPoints', () => {
  test('Test getXScale', () => {
    const chart = Chrt() .data([0,1,2,3,4,5])

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

  test('Test .class()', () => {
    const chart = Chrt().data([0,1,2,3,4,5]);

    const points = chrtPoints()
    chart.add(points)

    points.class('class1');
    expect(points._classNames).toEqual(['chrt-points','class1']);
    expect(chart.node().querySelector('.chrt-points.class1')).not.toBeNull()

    points.class('class2');
    expect(points._classNames).toEqual(['chrt-points','class2']);

    expect(chart.node().querySelector('.chrt-points.class1')).toBeNull()
    expect(chart.node().querySelector('.chrt-points.class2')).not.toBeNull()
  });
});
