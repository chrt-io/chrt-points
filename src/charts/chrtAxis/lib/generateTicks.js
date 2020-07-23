import { createSVG as create } from '~/layout';

export default function generateTicks(ticks,name,callback) {
  ticks.forEach((tick, i, arr) => {
    let tickGroup = this.g.querySelector(
      `[data-id='tick-${name}-${tick.value}']`
    );
    if (!tickGroup) {
      tickGroup = create('g');
      tickGroup.setAttribute('data-id', `tick-${name}-${tick.value}`);
      if(tick.isMinor) {
        tickGroup.classList.add('tick-minor');
      }

      this.g.appendChild(tickGroup);

      const tickLine = create('line');
      tickLine.setAttribute('stroke', this.stroke)
      tickLine.setAttribute('stroke-width', this.strokeWidth);
      tickGroup.appendChild(tickLine);

      const label = create('text')
      label.textContent = this.labelFormat(tick.value);
      label.setAttribute('fill', this.stroke)
      if(this._label && i === arr.length - 1) {
        label.textContent = `${this.labelFormat(tick.value)} ${this._label.text}`;
      }
      tickGroup.appendChild(label);
    }
    if(callback) {
      callback.call(null, tickGroup, tick);
    }
  });
}
