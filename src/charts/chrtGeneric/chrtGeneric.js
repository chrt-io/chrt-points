import { hasData, isNull } from '~/helpers';
import { accessor, render, update } from '../util';
import { data, node, parent } from '~/util';

export default function chrtGeneric() {
  this._id = null;

  this.id = (id) => {
    console.log('chrtGeneric.id', id, this._id);
    if(isNull(id)) {
      return this._id;
    }
    this._id = id;

    return this;
  }

  this.hasData = () => {
    return hasData(this);
  }

  this.draw = () => {
    return this.parentNode;
  }
  return this;
}

function chrt() {
  return new chrtGeneric();
}

chrtGeneric.prototype = chrt.prototype = {
  data,
  node,
  parent,
  accessor,
  render,
  update,
};
