import * as chrt from 'chrt';
import chrtPoints from '~/chrtPoints'

const data = new Array(100).fill(1).map((d,i) => ({x: -50 + i, y: -50 + i}));

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis().zero(0))
    .add(chrt.yAxis())
    .add(
      chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
        .size(5)
        .stroke('#000')
        .strokeWidth(2)
        .strokeOpacity(0.5)
        .fill('#ff6600')
        .fillOpacity(0.5)
    );
}
