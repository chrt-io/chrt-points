import {
  DEFAULT_ORIENTATION
} from '~/constants';
import {
  lineColor,
  lineWidth,
  setTickLength,
  setTickPosition,
  showAxis,
  hideAxis,
  showTicks,
  hideTicks,
  firstTick,
  lastTick,
  firstAndLastTicks,
  orient,
  format,
} from './lib';
import chrtGeneric from '../chrtGeneric';

const DEFAULT_LINE_WIDTH = 1;
const DEAULT_LINE_COLOR = '#000';
const TICK_LENGTH = 5;
const TICK_POSITION = 'outside';

function chrtAxis(name) {
  chrtGeneric.call(this);

  this.name = name;
  this.strokeWidth = DEFAULT_LINE_WIDTH;
  this.stroke = DEAULT_LINE_COLOR;
  this.showAxisLine = true;
  this.ticksFilter = () => true;
  this.tickLength = TICK_LENGTH;
  this.tickPosition = TICK_POSITION;
  this.orientation = DEFAULT_ORIENTATION[name];
  this.labelFormat = d => d;

  this.draw = () => {
    if (!this.parentNode.scales[name]) {
      return this.parentNode;
    }
    return this.parentNode;
  };
}

chrtAxis.prototype = Object.create(chrtGeneric.prototype);
chrtAxis.prototype.constructor = chrtAxis;
chrtAxis.parent = chrtGeneric.prototype;

chrtAxis.prototype = Object.assign(chrtAxis.prototype, {
  width: lineWidth,
  color: lineColor,
  setTickLength,
  setTickPosition,
  showAxis,
  hideAxis,
  showTicks,
  hideTicks,
  firstTick,
  lastTick,
  firstAndLastTicks,
  orient,
  format
});

export default chrtAxis;
