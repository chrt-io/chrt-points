import Chrt from 'chrt-core';
import {xAxis, yAxis} from 'chrt-axis';
import chrtPoints from '../../../src/chrtPoints'

const data = [
  {
    x: 'a',
    y: 10,
    y2: 22,
    pop: 600,
    pop2: 240,
  },
  {
    x: 'b',
    y: 14,
    y2: 22,
    pop: 20,
    pop2: 140,
  },
  {
    x: 'c',
    y: 14,
    y2: 22,
    pop: 190,
    pop2: 120,
  },
  {
    x: 'd',
    y: 22,
    y2: 22,
    pop: 380,
    pop2: 1200,
  }
];

export default async function(container) {
  const chart = Chrt()
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
          r: d.pop,
        }))
        .size({range: [0, 50], field: 'r'})
        //.size({scale: 'r'})
        .stroke('#000')
        .strokeWidth(2)
        .strokeOpacity(0.5)
        .fill('#ff6600')
        .fillOpacity(0.5)
    )
    .add(
      chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y2,
          r: d.pop2,
        }))
        .size({range: [0, 50], field: 'r'})
        //.size({scale: 'r'})
        .stroke('#000')
        .strokeWidth(2)
        .strokeOpacity(0.5)
        .fill('#336699')
        .fillOpacity(0.5)
    );

    return chart;
}
