import { isNull } from '~/helpers';

export default function curve(interpolationFunction) {
  if(isNull(interpolationFunction)) {
    return this.interpolationFunction;
  }

  this.interpolationFunction = interpolationFunction;


  return this;
}
