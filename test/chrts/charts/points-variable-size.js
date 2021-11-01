import Chrt from 'chrt-core';
import {xAxis, yAxis} from 'chrt-axis';
import chrtPoints from '../../../src/chrtPoints'

const data = [
  {
    x: 'a',
    y: 10,
    size: 130
  },
  {
    x: 'b',
    y: 14,
    size: 400
  },
  {
    x: 'c',
    y: 14,
    size: 50
  },
  {
    x: 'd',
    y: 22,
    size: 100
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
        .size(d => d.size)
        .stroke('#000')
        .strokeWidth(2)
        .strokeOpacity(0.5)
        .fill('#ff6600')
        .fillOpacity(0.5)
    );
}
