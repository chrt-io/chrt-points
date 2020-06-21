import { isNull } from '~/helpers';

export default function setPadding({top, bottom, left, right}) {
  this._padding.top = !isNull(top) ? top  : this._padding.top;
  this._padding.bottom = !isNull(bottom) ? bottom  : this._padding.bottom;
  this._padding.left = !isNull(left) ? left  : this._padding.left;
  this._padding.right = !isNull(right) ? right  : this._padding.right;

  return this.update();
}
