import { isNull } from '~/helpers';
import { createSVG as create } from '~/layout';
import { pointSize, pointColor, pointStroke, pointStrokeWidth, pointOpacity, strokeOpacity } from './lib';
import chrtGeneric from 'chrt-object';

const DEFAULT_POINT_SIZE = 3;
const DEFAULT_POINT_COLOR = '#000';

function chrtPoints() {
  chrtGeneric.call(this);
  this.type = 'series';

  this.attr('radius', DEFAULT_POINT_SIZE);
  this.attr('stroke', DEFAULT_POINT_COLOR);
  this.attr('fill', DEFAULT_POINT_COLOR);
  this.attr('strokeWidth', 0);
  this.attr('strokeOpacity', 1);
  this.attr('fillOpacity', 1);

  this._classNames = ['chrt-points'];

  this.getXScale = () => {
    if(isNull(this.fields.x)) {
      this.fields.x = this.parentNode.scales.x[this.scales.x].field;
    }
    return this.parentNode.scales.x[this.scales.x];
  }

  this.draw = () => {

    this._classNames.forEach(d => this.g.classList.add(d));

    if(!isNull(this._data)) {

      if(isNull(this.fields.x)) {
        this.fields.x = this.parentNode.scales.x[this.scales.x].field;
      }
      if(isNull(this.fields.y)) {
        //console.log('this.scales', this.scales)
        //console.log('this.parentNode.scales', this.parentNode.scales)
        this.fields.y = this.parentNode.scales.y[this.scales.y].field;
      }

      this._data.forEach((d, i, arr) => {
        // const point = points.find(p => )
        let circle = this.g.querySelector(`[data-id='circle-${name}-${i}']`);
        if (!circle) {
          circle = create('circle');
          circle.setAttribute('data-id', `circle-${name}-${i}`);
          this.g.appendChild(circle);
        }
        if(!isNull(this.parentNode.scales.x[this.scales.x]) && !isNull(this.parentNode.scales.y[this.scales.y])) {

          const x = this.parentNode.scales.x[this.scales.x](d[this.fields.x]);
          const y = this.parentNode.scales.y[this.scales.y](d[this.fields.y]);
          circle.setAttribute('cx', !isNaN(x) ? x : 0);
          circle.setAttribute('cy', !isNaN(y) ? y : 0);
          circle.setAttribute('r', this.attr('radius')(d, i, arr));
          circle.setAttribute('fill', this.attr('fill')(d, i, arr));
          circle.setAttribute('fill-opacity', this.attr('fillOpacity')(d, i, arr) || 1);
          circle.setAttribute('stroke', this.attr('stroke')(d, i, arr));
          circle.setAttribute('stroke-width', this.attr('strokeWidth')(d, i, arr));
          circle.setAttribute('stroke-opacity', this.attr('strokeOpacity')(d, i, arr));
        }
      });

      // // // console.log('points', points);
    }

    this.objects.forEach((obj) => obj.draw());

    return this;
  };
}

chrtPoints.prototype = Object.create(chrtGeneric.prototype);
chrtPoints.prototype.constructor = chrtPoints;
chrtPoints.parent = chrtGeneric.prototype;

chrtPoints.prototype = Object.assign(chrtPoints.prototype, {
  pointSize,
  size: pointSize,
  radius: pointSize,
  color: pointColor,
  fill: pointColor,
  stroke: pointStroke,
  strokeWidth: pointStrokeWidth,
  opacity: pointOpacity,
  fillOpacity: pointOpacity,
  strokeOpacity,
});

// export default chrtPoints;
export default function() {
  return new chrtPoints();
}
