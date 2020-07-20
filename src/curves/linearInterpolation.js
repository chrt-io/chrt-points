import { svgPath } from '../layout';

export default function linearInterpolation(data) {
  return svgPath(
    data.map(d => [
      this.parentNode.scales['x'](d[this.fields.x]),
      this.parentNode.scales['y'](d[this.fields.y])
    ]),
    lineCommand
  );
}

// Svg path line command
// I:  - point (array) [x, y]: coordinates
// O:  - (string) 'L x,y': svg line command
const lineCommand = point => `L ${point[0]} ${point[1]}`;
