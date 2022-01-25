import {
  pointSize,
  pointRadius,
  pointColor,
  pointStroke,
  pointStrokeWidth,
  pointOpacity,
  strokeOpacity,
  pointSymbol,
  pointRotate,
  shapes,
} from './lib';


import chrtObject, { utils, cssDisplay } from 'chrt-object';
const { isNull, isInfinity } = utils;

const DEFAULT_POINT_RADIUS = 3;
const DEFAULT_POINT_COLOR = '#000';
const DEFAULT_POINT_ROTATION = 0;
const POINT_SYMBOLS = ['circle', 'square'];

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
  this.attr('rotate', DEFAULT_POINT_ROTATION);
  this.attr('symbol', {symbol: POINT_SYMBOLS[0]});

  this._classNames = ['chrt-points'];

  this.getXScale = () => {
    if (isNull(this.fields.x)) {
      this.fields.x = this.parentNode.scales.x[this.scales.x].field;
    }
    return this.parentNode.scales.x[this.scales.x];
  };

  this.draw = () => {
    cssDisplay.call(this, this.attr('display')());

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
      const sizeScale = size({});
      // console.log('sizeScale', sizeScale)
      if (sizeScale?.scale) {
        // this.parentNode.scale({
        //   range: sizeValue.options.range || [0,10],
        //   scale:'sqrt',
        //   field: sizeValue.options.field || 'r',
        //   type:'x',
        //   name: sizeValue.options.field || 'r',
        //   margins:{top:0, bottom:0, left:0, right:0},
        //   padding:{top:0, bottom:0, left:0, right:0}
        // });
        // console.log('REDEFINE rScale')
        rScale = d => {
          const _scale = this.parentNode.scales.other[sizeScale.scale];
          const field = _scale.field;
          // console.log(
          //   '--->',
          //   d,
          //   sizeScale.scale,
          //   field,
          //   'domain:',
          //   _scale.domain,
          //   'range:',
          //   _scale.range,
          //   d[field],
          //   this.parentNode.scales.other[sizeScale.scale](d[field])
          // )
          return _scale(d[field]);
        }
      }
      if (sizeScale?.range) {
        this.parentNode.scale({
          domain: sizeScale.domain,
          range: sizeScale.range || [0,10],
          scale:'sqrt',
          field: sizeScale.field || 'r',
          type:'other',
          name: sizeScale.field || 'r',
          margins:{top:0, bottom:0, left:0, right:0},
          padding:{top:0, bottom:0, left:0, right:0}
        });
        // console.log('DEFINE rScale', this.parentNode.scales.other)
        rScale = d => {
          const field = sizeScale.field || 'r';
          const _scale = this.parentNode.scales.other[field];
          // console.log(
          //   '--->',
          //   d,
          //   field,
          //   'domain:',
          //   _scale.domain,
          //   'range:',
          //   _scale.range,
          //   d[field],
          //   _scale(d[field])
          // )
          return _scale(d[field]);
        }
      }


      this._data.forEach((d, i, arr) => {
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
            r = rScale((size?.scale || size?.range) ? d : size);
            // console.log('rScale', d, size, r)
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
          const {symbol, option} = this.attr('symbol')();
          let point = this.g.querySelector(`[data-id='point-${name}-${i}']`);
          if (!point) {
            //console.log(obj.attr)
            //circle = obj.create.call(this, 'circle');
            point = utils.createSVG.call(this,
              (symbol !== 'circle' && symbol !== 'text') ? 'path' : symbol
            );
            point.setAttribute('data-id', `point-${name}-${i}`);
            this.g.appendChild(point);
          }

          // console.log('POINT', symbol, point)
          if(symbol === 'custom') {
            shapes.custom(point, option);
          } else if (symbol === 'text') {
            shapes.text(point, option, r * 10);
          } else {
            shapes[symbol](point,0,0,r);
          }



          point.setAttribute('fill', this.attr('fill')(d, i, arr));
          point.setAttribute(
            'fill-opacity',
            this.attr('fillOpacity')(d, i, arr) || 1
          );
          point.setAttribute('stroke', this.attr('stroke')(d, i, arr));
          point.setAttribute(
            'stroke-width',
            this.attr('strokeWidth')(d, i, arr)
          );
          point.setAttribute(
            'stroke-opacity',
            this.attr('strokeOpacity')(d, i, arr)
          );

          point.setAttribute(
            'transform-origin',
            `0 0`
          );

          point.setAttribute(
            'transform',
            `translate(${cx}, ${cy}) rotate(${this.attr('rotate')(d, i, arr)})`
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
  rotate: pointRotate,
  symbol: pointSymbol,
  strokeOpacity
});

// export default chrtPoints;
export default function() {
  return new chrtPoints();
}
