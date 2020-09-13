import chrtGeneric from '../chrtGeneric';
import {
  fill,
  size,
  stroke,
  strokeWidth,
  showMarkers,
  hideMarkers,
  firstMarker,
  lastMarker,
  firstAndLastMarkers
} from './lib';
import { createSVG as create } from '~/layout';

const DEFAULT_RADIUS = 2;
const DEFAULT_FILL_COLOR = '#000';
const DEFAULT_STROKE = '#000';
const DEFAULT_STROKE_WIDTH = 1;

function chrtMarkers() {
  chrtGeneric.call(this);
  console.log('HI WE ARE MARKERS', this);
  this.type = 'markers';
  this.markers = [];
  this.g = null;
  this.markersFilter = () => true;

  this.draw = () => {
    console.log('DRAW MARKERS', this.parentNode.data(), this.parentNode.parentNode._data);
    const parentData = this.parentNode.data();
    // this might be broken when only local data to the component is updated - to be tested
    const data= parentData.length ? parentData : (this.parentNode.parentNode._data || []);
    const radius = this._radius || DEFAULT_RADIUS;
    const fill = this._fill || this.parentNode.stroke || DEFAULT_FILL_COLOR;
    const stroke = this.stroke || this.parentNode.stroke || DEFAULT_STROKE;
    const strokeWidth =
      this.strokeWidth || this.parentNode.strokeWidth || DEFAULT_STROKE_WIDTH;

    if (!this.g) {
      this.g = create('g');
      this.parentNode.g.appendChild(this.g);
    }

    data.forEach((marker, i) => {
      if (this.markers[i]) {
        // if the marker exists, just update its data
        this.markers[i].marker = marker;
      } else {
        // if the marker does not exists, create a new one
        const circle = create('circle');
        this.markers.push({
          circle,
          marker
        });
        this.g.appendChild(circle);
      }
    });

    this.markers
      .filter((marker, i, arr) => this.markersFilter(marker.marker, i, arr))
      .forEach(d => {
        d.circle.setAttribute(
          'cx',
          this.parentNode.parentNode.scales['x'](
            d.marker[this.parentNode.fields.x]
          )
        );
        d.circle.setAttribute(
          'cy',
          this.parentNode.parentNode.scales['y'](
            d.marker[this.parentNode.fields.y]
          )
        );
        d.circle.setAttribute('fill', fill);
        d.circle.setAttribute('r', radius);
        d.circle.setAttribute('stroke', stroke);
        d.circle.setAttribute('stroke-width', strokeWidth);
      });

    return this.parentNode;
  };
}

chrtMarkers.prototype = Object.create(chrtGeneric.prototype);
chrtMarkers.prototype.constructor = chrtMarkers;
chrtMarkers.parent = chrtGeneric.prototype;

chrtMarkers.prototype = Object.assign(chrtMarkers.prototype, {
  fill,
  size,
  stroke,
  strokeWidth,
  showMarkers,
  hideMarkers,
  firstMarker,
  lastMarker,
  firstAndLastMarkers
});

export default chrtMarkers;
