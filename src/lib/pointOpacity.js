export default function pointOpacity(value) {
    if(!value) {
      return this._opacity;
    }
  
    if (typeof value === 'function') {
      // something will go here
    } else {
      this._opacity = value;
    }
    return this;
  }
  