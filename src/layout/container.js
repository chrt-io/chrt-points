export default function container() {
  this._container = document.createElement('div');
  this._node.appendChild(this._container);
  return this;
}
