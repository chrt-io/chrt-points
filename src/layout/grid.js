import { createSVG as create,  } from './create';

export default function grid(name, ticksNumber) {
  if(!name) {
    return this;
  }

  if (!this.gridG) {
    this.gridG = create('g');
    this.gridG.setAttribute('id', `grid-${name}`);
    this.currentNode.appendChild(this.gridG);
  }

  this.draw = () => {
    const ticks = this.scales['x'].ticks(ticksNumber);

    this.gridG.innerHTML = '';
    ticks.forEach(tick => {
      let gridLine = this.gridG.querySelector(`[data-id='gridLine-${name}-${tick.value}']`)
      if(!gridLine) {
        gridLine = create('line');
        gridLine.setAttribute('data-id', `gridLine-${name}-${tick.value}`)
        this.gridG.appendChild(gridLine);
      }
      gridLine.setAttribute('stroke', '#ddd');
      gridLine.setAttribute('x1', tick.x);
      gridLine.setAttribute('x2', tick.x);
      gridLine.setAttribute('y1', 0);
      gridLine.setAttribute('y2', 400);
    })
  }

  this.update = () => {
    this.draw();
  }

  this.draw();

  return this;
}
