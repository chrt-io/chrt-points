import Chrt from 'chrt-core';
import {xAxis, yAxis} from 'chrt-axis';
import chrtPoints from '../../../src/chrtPoints'

const data = [
  {
    x: 'a',
    y: 10,
    r: 6
  },
  {
    x: 'b',
    y: 14,
    r: 2
  },
  {
    x: 'c',
    y: 14,
    r: 9
  },
  {
    x: 'd',
    y: 22,
    r: -10
  }
];

export default async function(container) {
  return Chrt()
    .node(container)
    .size(600, 200)
    .x({scale:'ordinal'})
    .add(xAxis())
    .add(yAxis())
    .add(
      chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
        .radius(d => d.r)
        .stroke('#000')
        .strokeWidth(2)
        .strokeOpacity(0.5)
        .fill('#ff6600')
        .fillOpacity(0.5)
    );
}
