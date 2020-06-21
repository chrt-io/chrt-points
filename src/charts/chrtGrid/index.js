import chrtGrid from './chrtGrid';

export function horizontalGrid(ticksNumber) {
  chrtGrid.call(this, 'x', ticksNumber);
}
horizontalGrid.prototype = Object.create(chrtGrid.prototype);
horizontalGrid.prototype.constructor = horizontalGrid;
horizontalGrid.parent = chrtGrid.prototype;

export function verticalGrid(ticksNumber) {
  chrtGrid.call(this, 'y', ticksNumber);
}
verticalGrid.prototype = Object.create(chrtGrid.prototype);
verticalGrid.prototype.constructor = verticalGrid;
verticalGrid.parent = chrtGrid.prototype;

export default chrtGrid;
