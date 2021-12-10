import {
  pointSize,
  pointRadius,
  pointColor,
  pointStroke,
  pointStrokeWidth,
  pointOpacity,
  strokeOpacity
} from './lib';
import chrtObject, { utils } from 'chrt-object';
const { isNull, isInfinity } = utils;

const DEFAULT_POINT_RADIUS = 3;
const DEFAULT_POINT_COLOR = '#000';

function chrtPoints() {
  chrtObject.call(this);
  // console.log(this.create)
  this.type = 'series';

  this.attr('radius', DEFAULT_POINT_RADIUS);
  this.attr('stroke', DEFAULT_POINT_COLOR);
  this.attr('fill', DEFAULT_POINT_COLOR);
  this.attr('strokeWidth', 0);
  this.attr('strokeOpacity', 1);
  this.attr('fillOpacity', 1);
  this.attr('size', null);

  this._classNames = ['chrt-points'];

  this.getXScale = () => {
    if (isNull(this.fields.x)) {
      this.fields.x = this.parentNode.scales.x[this.scales.x].field;
    }
    return this.parentNode.scales.x[this.scales.x];
  };

  this.draw = () => {
    // this._classNames.forEach(d => this.g.classList.add(d));
    this.g.classList.remove(...this.g.classList)
    this.g.classList.add(...this._classNames);
    if (!isNull(this._data)) {
      if (isNull(this.fields.x)) {
        this.fields.x = this.parentNode.scales.x[this.scales.x].field;
      }
      if (isNull(this.fields.y)) {
        //console.log('this.scales', this.scales)
        //console.log('this.parentNode.scales', this.parentNode.scales)
        this.fields.y = this.parentNode.scales.y[this.scales.y].field;
      }
      let rScale = d => Math.sqrt(d/Math.PI);
      const size = this.attr('size');
      if(!isNull(size)) {
        const sizeValue = size({});
        if (sizeValue?.options) {
          this.parentNode.scale({
            range: sizeValue.options.range || [0,10],
            scale:'sqrt',
            field: sizeValue.options.field || 'r',
            type:'x',
            name: sizeValue.options.field || 'r',
            margins:{top:0, bottom:0, left:0, right:0},
            padding:{top:0, bottom:0, left:0, right:0}
          });
          rScale = d => {
            // console.log('rScale',d)
            // console.log('---->', this.parentNode.scales.x[sizeValue.options.field || 'r'](d))
            // console.log('range:',this.parentNode.scales.x[sizeValue.options.field || 'r'].range)
            // console.log('domain:',this.parentNode.scales.x[sizeValue.options.field || 'r'].domain)
            return this.parentNode.scales.x[sizeValue.options.field || 'r'](d);
          }
        }
      }

      this._data.forEach((d, i, arr) => {
        // const point = points.find(p => )
        let circle = this.g.querySelector(`[data-id='circle-${name}-${i}']`);
        if (!circle) {
          //console.log(obj.attr)
          //circle = obj.create.call(this, 'circle');
          circle = utils.createSVG.call(this,'circle');
          circle.setAttribute('data-id', `circle-${name}-${i}`);
          this.g.appendChild(circle);
        }
        if (
          !isNull(this.parentNode.scales.x[this.scales.x]) &&
          !isNull(this.parentNode.scales.y[this.scales.y])
        ) {
          const x = this.parentNode.scales.x[this.scales.x](d[this.fields.x]);
          const y = this.parentNode.scales.y[this.scales.y](d[this.fields.y]);

          const cx = !isNaN(x) && !isInfinity(x) ? x : 0;
          const cy = !isNaN(y) && !isInfinity(y) ? y : 0;
          let r = this.attr('radius')(d, i, arr);

          const size = this.attr('size')(d,i,arr);
          if(!isNull(size)) {
            // console.log('d',d,'->',rScale(size(d,i,arr)))
            r = rScale(size.value ? size.value(d,i,arr) : size);
            // const sizeValue = size(d,i,arr);
            // if (sizeValue.options) {
            //   const value = sizeValue.value(d, i, arr)
            //   this.parentNode.scale({range: sizeValue.options.range || [0,10], scale:'sqrt',field: sizeValue.options.field || 'r', type:'x',name: sizeValue.options.field || 'r'});
            //   const rScale = this.parentNode.scales.x[sizeValue.options.field || 'r'];
            //   console.log()
            //   const rScale = this.parentNode.scales.x[sizeValue.options.field || 'r'];
            //   r = rScale(value);
            // } else {
            //   r = Math.sqrt(sizeValue/Math.PI)
            // }
          }

          d.anchorPoints = {
            x: cx,
            width: r,
            y: cy,
            height: r,
            relativePosition: [0,-1],
            directions: {
              x: 1,
              y: 1,
            },
            alignment: {
              horizontal: 'middle',
              vertical: 'top',
            }
          };

          circle.setAttribute('cx', cx);
          circle.setAttribute('cy', cy);
          circle.setAttribute('r', Math.max(0, isNaN(r) ? 0 : r));
          circle.setAttribute('fill', this.attr('fill')(d, i, arr));
          circle.setAttribute(
            'fill-opacity',
            this.attr('fillOpacity')(d, i, arr) || 1
          );
          circle.setAttribute('stroke', this.attr('stroke')(d, i, arr));
          circle.setAttribute(
            'stroke-width',
            this.attr('strokeWidth')(d, i, arr)
          );
          circle.setAttribute(
            'stroke-opacity',
            this.attr('strokeOpacity')(d, i, arr)
          );
        }
      });

      // // // console.log('points', points);
    }

    this.objects.forEach(obj => obj.draw());

    return this;
  };
}

chrtPoints.prototype = Object.create(chrtObject.prototype);
chrtPoints.prototype.constructor = chrtPoints;
chrtPoints.parent = chrtObject.prototype;

chrtPoints.prototype = Object.assign(chrtPoints.prototype, {
  pointSize,
  size: pointSize,
  radius: pointRadius,
  color: pointColor,
  fill: pointColor,
  stroke: pointStroke,
  strokeWidth: pointStrokeWidth,
  opacity: pointOpacity,
  fillOpacity: pointOpacity,
  strokeOpacity
});

// export default chrtPoints;
export default function() {
  return new chrtPoints();
}
