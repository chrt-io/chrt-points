import {hasData} from '~/helpers';

export default function (data, accessor) {
  console.log('----> data', data);
  if (!data) {
    return this._data;
  }
  if(!hasData(this)) {
    return this;
  }
  console.log('chrt or series', this.type)
  // passing only accessor to inherit/reuse data
  if(typeof arguments[0] === 'function') {
    console.log('ACCESSOR FUNCTION')
    this._accessor = arguments[0];
    return this;
  }
  console.log('DATA', this, this._data, data);
  // data is passed
  this._orginalData = data;


  // define accessor function to map values
  const accessorFunction = accessor || this._accessor;
  this._accessor = accessorFunction;
  this._data = accessorFunction ? data.map((d, i) => {
    if(d instanceof Object) {
      return Object.assign({}, d, accessorFunction(d, i));
    }
    return accessorFunction(d, i);
  }) : data;

  // if(typeof this.id !== 'undefined') {
  //   console.log('data', this._data);
  //   console.log('THIS!', this)
  //   console.log('id', this.id())
  // }

  return this;
}
