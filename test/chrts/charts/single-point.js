import * as chrt from 'chrt';
import chrtPoints from '../../../src/chrtPoints'

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis(2))
    .add(chrt.yAxis())
    .add(
      chrtPoints()
        .data([10])
        .radius(10)
    );
}
