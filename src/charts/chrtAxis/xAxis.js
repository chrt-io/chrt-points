import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function xAxis(ticksNumber = TICKS_DEFAULT) {
  chrtAxis.call(this, 'x');
  const name = this.name;

  const xAxisTick = (tickGroup, visible) => {
    tickGroup.style.display = visible ? 'block' : 'none';

    const tickLine = tickGroup.querySelector('line');

    const orientation =
      this.orientation === DEFAULT_ORIENTATION[this.name] ? 1 : -1;

    tickLine.setAttribute('x1', 0);
    tickLine.setAttribute('x2', 0);
    tickLine.setAttribute('y1', 0);
    tickLine.setAttribute('y2', this.tickLength * orientation);

    const label = tickGroup.querySelector('text');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('y', this.tickLength * orientation);
    label.setAttribute('dy', `${orientation > 0 ? 1 : -0.2}em`);
    label.setAttribute('fill', this.stroke);
  };

  this.draw = () => {
    if (!this.parentNode.scales[name]) {
      return this.parentNode;
    }

    const { _margins, width, height, scales } = this.parentNode;

    // console.log('X AXIS TICKS NUMBER', ticksNumber)
    const ticks = scales[name]
      .ticks(ticksNumber * 2)
      .filter((tick, i, arr) => this.ticksFilter(tick.value, i, arr));

    this.g.setAttribute('id', `${name}Axis-${this.id()}`);
    const axisY =
      this.orientation === DEFAULT_ORIENTATION[this.name]
        ? height - _margins.bottom
        : _margins.top;
    this.g.setAttribute('transform', `translate(0,${axisY})`);

    let axisLine = this.g.querySelector(`[data-id='tick-${name}-axis-line']`);
    if (!axisLine) {
      axisLine = create('line');
      axisLine.setAttribute('data-id', `tick-${name}-axis-line`);
      this.g.appendChild(axisLine);
    }

    axisLine.setAttribute('stroke', this.stroke);
    axisLine.setAttribute('stroke-width', this.strokeWidth);

    axisLine.setAttribute('x1', _margins.left);
    axisLine.setAttribute('x2', width - _margins.right);
    const axisLineY = scales['y'].isLog() ? scales['y'].range[1] : scales['y'](0) - (height - _margins.bottom);
    axisLine.setAttribute('y1', axisLineY);
    axisLine.setAttribute('y2', axisLineY);

    // if no axis remove the axis line after creating it
    if (!this.showAxisLine) {
      axisLine.remove();
    }

    const isLog = scales[name].isLog();
    generateTicks.call(this, ticks, name, (tickGroup, tick) => {
      const position = scales[name](tick.value);
      tickGroup.setAttribute('transform', `translate(${position}, 0)`);
      let visible =
        position >= _margins.left && position <= width - _margins.right;
      visible = visible && (this.showMinorTicks || !tick.isMinor);
      visible = visible && ((!isLog) || (isLog && !tick.isMinor));
      xAxisTick(tickGroup, visible);
    });

    return this.parentNode;
  };
}

xAxis.prototype = Object.create(chrtAxis.prototype);
xAxis.prototype.constructor = xAxis;
xAxis.parent = chrtAxis.prototype;

export default xAxis;
