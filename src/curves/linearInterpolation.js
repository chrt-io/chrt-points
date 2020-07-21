import { svgPath } from '../layout';
import { isNull } from '~/helpers';

export default function linearInterpolation(data) {
  return svgPath(
    data.map(d => [
      this.parentNode.scales['x'](d[this.fields.x]),
      isNull(d[this.fields.y]) ? null : this.parentNode.scales['y'](d[this.fields.y])
    ]),
    lineCommand
  );
}

// Svg path line command
// I:  - point (array) [x, y]: coordinates
// O:  - (string) 'L x,y': svg line command
const lineCommand = point => `L ${point[0]} ${point[1]}`;
