import NiceScale from '~/scales/niceLinearScale';

export default function scale(name, scaleType, domain, range) {
  const TICKS_DEFAULT = 10;
  let _ticks = [];

  const domainExtent = domain || [null, null];
  if (arguments.length === 1) {
    return this.scales[arguments[0]];
  }
  if (!domain) {
    this._data.forEach(d => {
      domainExtent[0] =
        domainExtent[0] == null ? d[name] : Math.min(d[name], domainExtent[0]);
      domainExtent[1] =
        domainExtent[1] == null ? d[name] : Math.max(d[name], domainExtent[1]);
    });
  }

  const numScale = new NiceScale(domainExtent, TICKS_DEFAULT);

  domainExtent[0] = numScale.getNiceMin();
  domainExtent[1] = numScale.getNiceMax();

  // // console.log('DOMAIN', domainExtent);

  const domainWidth = domainExtent[1] - domainExtent[0];
  const direction = (range[1] >= range[0] ? 1 : -1);
  const rangeWidth =
    (range[1] - range[0]) -
    (name === 'x'
      ? this.margins.left + this.margins.right
      : this.margins.top + this.margins.bottom) * direction;

  const startCoord =
    range[0] + (name === 'x' ? this.margins.left : this.margins.bottom) * direction;

  // // console.log(name, range[1], range[0], `rangeWidth: ${rangeWidth}`, this.margins, 'startCoord:', startCoord);
  this.scalingFunction = d => d;

  switch (scaleType) {
    case 'log':
      this.scalingFunction = d => d;
      break;
    case 'linear':
      this.scalingFunction = d => {
        const valueToDomain = (d - domainExtent[0]) / domainWidth;
        return (startCoord  + rangeWidth * valueToDomain);
      };

      break;
    default:
      this.scalingFunction = d => d;
  }

  this.scales[name] = this.scalingFunction;
  const ticks = n => {
    if(n == null && _ticks.length > 0) {
      return _ticks;
    }

    const numScale = new NiceScale(domainExtent, n);
    _ticks = numScale.getTicks().map((value, index) => ({
      index,
      value,
      x: this.scalingFunction(value),
    }));
    // // console.log("Tick Spacing:\t" + numScale.getTickSpacing());
    // // console.log("Nice Minimum:\t" + numScale.getNiceMin());
    // // console.log("Nice Maximum:\t" + numScale.getNiceMax());
    // // console.log("Nice ticks:\t" + numScale.getTicks());

    return _ticks;
  };

  this.scales[name].ticks = ticks;
  return this;
}
