import * as chrt from 'chrt';
import chrtPoints from '~/chrtPoints'

const data = [
  {
    x: 'a',
    y: 10
  },
  {
    x: 'b',
    y: 14
  },
  {
    x: 'c',
    y: 14
  },
  {
    x: 'd',
    y: 22
  }
];

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .x({scale:'ordinal'})
    .add(chrt.xAxis())
    .add(chrt.yAxis())
    .add(
      chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
        .radius(5)
        .stroke('#000')
        .strokeWidth(2)
        .strokeOpacity(0.5)
        .fill('#ff6600')
        .fillOpacity(0.5)
    );
}
