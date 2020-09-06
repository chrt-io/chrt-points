import { svgPath } from '../layout';
import { isNull, isInfinity } from '~/helpers';

export default function linearInterpolation(data) {
  return svgPath(
    data.map(d => [
      this.parentNode.scales['x'](d[this.fields.x]),
      (isNull(d[this.fields.y]) || isInfinity(d[this.fields.y])) ? null : this.parentNode.scales['y'](d[this.fields.y])
    ]),
    lineCommand
  );
}

export const lineCommand = point => `L${point[0]},${point[1]}`;
