import { isNull } from '~/helpers';
export default function alignment(align) {
  if(isNull(align)) {
    return this;
  }

  console.log('alignment', align)

  if (typeof coords === 'function') {
    // something will go here
  } else {
    this._alignment = Object.assign({}, this._alignment, align);
  }

  return this;
}

export function valign(position) {
  return alignment.call(this, {vertical: position})
}

export function align(position) {
  let horizontal = 'left';
  switch (position) {
    case 'right':
      horizontal = 'end'
    break;
    case 'center':
      horizontal = 'middle'
    break;
    default:
      horizontal = 'start'
  }
  return alignment.call(this, {horizontal})
}
