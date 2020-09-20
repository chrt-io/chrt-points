import logTicks from './util/logTicks';
import { baseLog } from '~/helpers/math';
import { memoize } from '~/util';

export default function scale(name, domain, range, transformation = 'log10') {
  // console.log('LOG SCALE', name, domain, range, transformation);
  // console.log('this.scales[',name,'].domain','=',this.scales[name].domain, 'isLog?',this.scales[name].isLog())
  const log = baseLog();

  let _ticks = [];

  range[0] += (name === 'x' ? this._padding.left : -this._padding.bottom);
  range[1] -= (name === 'x' ? this._padding.right : -this._padding.top);
  // // console.log(name,'RANGE',range)

  const currentDomain = (this.scales[name] && this.scales[name].isLog()) ? this.scales[name].domain : [];
  // console.log('currentDomain', currentDomain)
  let domainExtent = domain || currentDomain;
  // console.log('using domainExtent', domainExtent[0], domainExtent[1]);
  if (arguments.length === 1) {
    return this.scales[arguments[0]];
  }
  if(!domainExtent.length || (domainExtent[0] !== currentDomain[0] || domainExtent[1] !== currentDomain[1])) {
    // domainExtent = [];
    this._data.filter(d => d[name] > 0).forEach(d => {
      domainExtent[0] =
        domainExtent[0] == null ? d[name] : Math.min(d[name], domainExtent[0]);
      domainExtent[1] =
        domainExtent[1] == null ? d[name] : Math.max(d[name], domainExtent[1]);
    });
    // console.log('1 domainExtent ->', domainExtent[0], domainExtent[1])
    // // console.log('NEED TO CHECK FOR objects', this.objects)
    this.objects.forEach(obj => {
      // // console.log('setting domain', obj.id())
      if(obj._data) {
        obj._data.filter(d => d[name] > 0).forEach(d => {
          domainExtent[0] =
            domainExtent[0] == null ? d[name] : Math.min(d[name], domainExtent[0]);
          domainExtent[1] =
            domainExtent[1] == null ? d[name] : Math.max(d[name], domainExtent[1]);
        });
      }
    })
    // console.log('2 domainExtent ->', domainExtent[0], domainExtent[1])
  }

  const numScale = new logTicks(domainExtent);

  // re-assign domain based on max/min of logTicks nice scale
  domainExtent[0] = numScale.getMin();
  domainExtent[1] = numScale.getMax();

  // console.log('NEW domain extent', domainExtent[0], domainExtent[1])

  const domainWidth = log(domainExtent[1]) - log(domainExtent[0]);
  const direction = (range[1] >= range[0] ? 1 : -1);
  const rangeWidth =
    (range[1] - range[0]) -
    (name === 'x'
      ? this._margins.left + this._margins.right
      : this._margins.top + this._margins.bottom) * direction;

  const startCoord =
    range[0] + (name === 'x' ? this._margins.left : this._margins.bottom) * direction;

  // // console.log('new this.scalingFunction', domainExtent, range, rangeWidth)
  const scalingFunction = d => {
    const valueToDomain = (log(d) - log(domainExtent[0])) / domainWidth;
    //// // console.log('LOG scalingFunction',domainExtent, d,log(d),log(domainExtent[0]),log(domainExtent[1]),valueToDomain);
    // // console.log('LOG', d, startCoord  + rangeWidth * valueToDomain)
    return (startCoord  + rangeWidth * valueToDomain);
  };

  const ticks = n => {
    if(n == null && _ticks.length > 0) {
      return _ticks;
    }
    _ticks = numScale.ticks(n).map((value, index) => ({
      index,
      value,
      x: scalingFunction(value),
      isMinor: log(value) % 1,
    }));

    return _ticks;
  };

  const getName = () => {
    return name;
  }
  const getTransformation = () => {
    return transformation;
  }

  scalingFunction.getName = getName;
  scalingFunction.getTransformation = getTransformation;
  scalingFunction.isLog = () => true;
  scalingFunction.domain = domainExtent;
  scalingFunction.range = range

  scalingFunction.ticks = memoize(ticks);
  this.scales[name] = scalingFunction;
  return this;
}
