import { isNull } from '~/helpers';
import { createSVG as create } from '~/layout';
import { pointSize, pointColor, pointStroke, pointStrokeWidth, pointOpacity } from './lib';
import { chrtGeneric } from 'chrt-core';

const DEFAULT_POINT_SIZE = 3;
const DEFAULT_POINT_COLOR = '#000';

function chrtPoints() {
  chrtGeneric.call(this);
  this.type = 'series';

  this.size = DEFAULT_POINT_SIZE;
  this.fill = DEFAULT_POINT_COLOR;
  this.stroke = DEFAULT_POINT_COLOR;
  this.strokeWidth = 0;
  this._opacity = 1;

  this.draw = () => {
    if(!isNull(this._data)) {
      this._data.forEach((d, i) => {
        // const point = points.find(p => )
        let circle = this.g.querySelector(`[data-id='circle-${name}-${i}']`);
        if (!circle) {
          circle = create('circle');
          circle.setAttribute('data-id', `circle-${name}-${i}`);
          this.g.appendChild(circle);
        }
        if(!isNull(this.parentNode.scales['x']) && !isNull(this.parentNode.scales['y'])) {
          const x = this.parentNode.scales['x'](d[this.fields.x]);
          const y = this.parentNode.scales['y'](d[this.fields.y]);
          circle.setAttribute('cx', !isNaN(x) ? x : 0);
          circle.setAttribute('cy', !isNaN(y) ? y : 0);
          circle.setAttribute('r', this.size);
          circle.setAttribute('fill', this.fill);
          circle.setAttribute('fill-opacity', this._opacity);
          circle.setAttribute('stroke', this.stroke);
          circle.setAttribute('stroke-width', this.strokeWidth);
        }
      });

      // // // console.log('points', points);
    }
    return this.parentNode;
  };
}

chrtPoints.prototype = Object.create(chrtGeneric.prototype);
chrtPoints.prototype.constructor = chrtPoints;
chrtPoints.parent = chrtGeneric.prototype;

chrtPoints.prototype = Object.assign(chrtPoints.prototype, {
  pointSize,
  color: pointColor,
  strokeColor: pointStroke,
  width: pointStrokeWidth,
  opacity: pointOpacity
});

// export default chrtPoints;
export default function() {
  return new chrtPoints();
}
