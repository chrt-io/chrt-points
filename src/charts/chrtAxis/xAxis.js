import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION } from '~/constants';

function xAxis(ticksNumber) {
  chrtAxis.call(this, 'x');
  const name = this.name;

  const xAxisTick = tickGroup => {
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
  };

  this.draw = () => {
    if (!this.parentNode.scales[name]) {
      return this.parentNode;
    }

    const { _margins, width, height, scales } = this.parentNode;

    const ticks = scales[name]
      .ticks(ticksNumber)
      .filter((tick, i, arr) => this.ticksFilter(tick.value, i, arr));

    this.g.setAttribute('id', `${name}Axis`);
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
    const axisLineY = scales['y'](0) - (height - _margins.bottom);
    axisLine.setAttribute('y1', axisLineY);
    axisLine.setAttribute('y2', axisLineY);

    // if no axis remove the axis line after creating it
    if (!this.showAxisLine) {
      axisLine.remove();
    }

    generateTicks.call(this, ticks, name, (tickGroup, tick) => {
      const position = scales[name](tick.value);
      tickGroup.setAttribute('transform', `translate(${position}, 0)`);
      xAxisTick(tickGroup, tick);
    });

    return this.parentNode;
  };
}

xAxis.prototype = Object.create(chrtAxis.prototype);
xAxis.prototype.constructor = xAxis;
xAxis.parent = chrtAxis.prototype;

export default xAxis;
