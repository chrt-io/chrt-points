import { hasData, isNull } from '~/helpers';
import { accessor, render, update, curve } from '../util';
import { data, node, parent } from '~/util';
import { linearInterpolation } from '~/curves';

export default function chrtGeneric() {
  this._id = null;
  this.fields = {
    x: 'x',
    y: 'y',
  };
  this.interpolationFunction = linearInterpolation;

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

  const setField = (field, value) => {
    if(!isNull(value)) {
      this.fields[field] = value;
      // TODO: verify if this is necessary -> maybe not
      // this._accessor = (d) => {
      //   return {
      //     x: d[this.fields.x],
      //     y: d[this.fields.y],
      //   }
      // };
    }
  }

  this.x = (value) => {
    if(isNull(value)) {
      return this.fields.x;
    }
    setField('x', value)
    return this;
  };
  this.y = (value) => {
    if(isNull(value)) {
      return this.fields.y;
    }
    setField('y', value);
    return this;
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
  curve,
};
