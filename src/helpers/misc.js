import {COMPONENTS_W_DATA} from '~/constants';

export function isNull(value) {
  return value === null || value == null || typeof value === 'undefined';
}

export function uuid() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
export function hasData(obj) {
  return !isNull(obj.type) && COMPONENTS_W_DATA.indexOf(obj.type) > -1
}
