import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function yAxis(ticksNumber = TICKS_DEFAULT) {
  chrtAxis.call(this, 'y');
  const name = this.name;

  const yAxisTick = (tickGroup, visible) => {
    tickGroup.style.display = visible ? 'block' : 'none';

    const orientation =
      this.orientation === DEFAULT_ORIENTATION[this.name] ? 1 : -1;

    const tickLine = tickGroup.querySelector('line');

    tickLine.setAttribute('x1', 0);
    tickLine.setAttribute(
      'x2',
      (this.tickPosition === 'outside' ? -this.tickLength : 0) * orientation
    );

    const label = tickGroup.querySelector('text');
    label.setAttribute(
      'text-anchor',
      this.tickPosition === 'outside'
        ? ~orientation
          ? 'end'
          : 'start'
        : ~orientation
        ? 'start'
        : 'end'
    );
    label.setAttribute(
      'x',
      (this.tickPosition === 'outside' ? -this.tickLength : 0) * orientation
    );
    label.setAttribute(
      'dx',
      `${(this.tickPosition === 'outside' ? -2 : 2) * orientation}px`
    );
    label.setAttribute(
      'dy',
      this.tickPosition === 'outside' ? '0.25em' : '-0.3em'
    );
    label.setAttribute('fill', this.stroke);
  };

  this.draw = () => {
    if (!this.parentNode.scales[name]) {
      return this.parentNode;
    }
    const { _margins, scales, width, height } = this.parentNode;

    this.g.setAttribute('id', `${name}Axis${this.id()}`);
    const axisX =
      this.orientation === DEFAULT_ORIENTATION[this.name] ? _margins.left : width - _margins.right;
    this.g.setAttribute('transform', `translate(${axisX},0)`);

    const ticks = scales[name]
      //.ticks(ticksNumber * (this.showMinorTicks ? 2 : 1))
      .ticks(ticksNumber * 2)
      .filter((tick, i, arr) => this.ticksFilter(tick.value, i, arr));

    let axisLine = this.g.querySelector(`[data-id='tick-${name}-axis-line']`);
    if (!axisLine) {
      axisLine = create('line');
      axisLine.setAttribute('data-id', `tick-${name}-axis-line`);
      this.g.appendChild(axisLine);
    }

    axisLine.setAttribute('stroke', this.stroke);
    axisLine.setAttribute(
      'stroke-width',
      this.tickPosition === 'outside' ? this.strokeWidth : 0
    );

    axisLine.setAttribute('x1', 0);
    axisLine.setAttribute('x2', 0);
    axisLine.setAttribute('y1', _margins.top);
    axisLine.setAttribute('y2', height - _margins.bottom);

    // if no axis remove the axis line after creating it
    if (!this.showAxisLine) {
      axisLine.remove();
    }

    const isLog = scales[name].isLog();
    this.g.querySelectorAll('g').forEach(d => {
      const tickName = d.getAttribute('data-id');

      const tick = ticks.find(tick => tickName === `tick-${name}-${tick}`);

      if(!tick) {
        d.remove();
      }
    })
    generateTicks.call(this, ticks, name, (tickGroup, tick) => {
      const position = scales[name](tick.value);
      tickGroup.setAttribute('transform', `translate(0, ${position})`);
      let visible =
        position >= _margins.top && position <= height - _margins.bottom;
      visible = visible && (this.showMinorTicks || !tick.isMinor);
      visible = visible && ((!isLog) || (isLog && !tick.isMinor));
      yAxisTick(tickGroup, visible);
    });



    return this.parentNode;
  };
}

yAxis.prototype = Object.create(chrtAxis.prototype);
yAxis.prototype.constructor = yAxis;
yAxis.parent = chrtAxis.prototype;

export default yAxis;
