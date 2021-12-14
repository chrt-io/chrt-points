import Chrt from 'chrt-core';
import {xAxis, yAxis} from 'chrt-axis';
import chrtPoints from '../../../src/chrtPoints'

const data = [
  {
    x: 'a',
    y: 10,
    pop: 600
  },
  {
    x: 'b',
    y: 14,
    pop: 20
  },
  {
    x: 'c',
    y: 14,
    pop: 190
  },
  {
    x: 'd',
    y: 22,
    pop: 380
  }
];

export default async function(container) {
  return Chrt()
    .node(container)
    .size(600, 200)
    // .margins({top:0,left:0,bottom:0,right:0})
    // .padding({top:0,left:0,bottom:0,right:0})
    .x({scale:'ordinal'})
    // .scale({name: 'r', range:[0,50], scale: 'sqrt', field: 'pop', type:'other'})
    .add(xAxis())
    .add(yAxis())
    .add(
      chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
        .size({range: [0, 50], field: 'pop', domain: [0, 10000]})
        //.size({scale: 'r'})
        .stroke('#000')
        .strokeWidth(2)
        .strokeOpacity(0.5)
        .fill('#ff6600')
        .fillOpacity(0.5)
    );
}
