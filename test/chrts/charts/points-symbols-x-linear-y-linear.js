// import Chrt from 'chrt-core';
import * as chrt from 'chrt';
// import {xAxis, yAxis} from 'chrt-axis';
import chrtPoints from '../../../src/chrtPoints'

const data = new Array(15).fill(1).map((d,i) => ({x: 0 + i, y: 0 + i}));

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis().zero(0))
    .add(chrt.yAxis())
    .add(chrt.horizontalGrid().color('#ddd'))
    .add(chrt.verticalGrid().color('#ddd'))
    .add(
      chrtPoints()
        .data(data.slice(0,3), d => ({
          x: d.x,
          y: d.y,
        }))
        .size(50)
        .symbol('times')
        .strokeWidth(2)
    )
    .add(
      chrtPoints()
        .data(data.slice(3,6), d => ({
          x: d.x,
          y: d.y,
        }))
        .size(50)
        .symbol('plus').strokeWidth(2)
    )
    .add(
      chrtPoints()
        .data(data.slice(6,9), d => ({
          x: d.x,
          y: d.y,
        }))
        .size(30)
        .symbol('square')
        .strokeWidth(2)
        .fill('#fff')
    )
    .add(
      chrtPoints()
        .data(data.slice(9,12), d => ({
          x: d.x,
          y: d.y,
        }))
        .size(20)
        //.symbol('times').strokeWidth(2)
    )
    .add(
      chrtPoints()
        .data(data.slice(12,15), d => ({
          x: d.x,
          y: d.y,
        }))
        .size(20)
        .symbol('custom','M-3,-3l4,4m0,-4l4,4')
        .strokeWidth(2)
        .stroke('#f00')
    )
}
