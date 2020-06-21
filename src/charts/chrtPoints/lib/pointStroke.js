export default function pointStroke(value) {
  if(!value) {
    return this.stroke;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.stroke = value;
  }
  return this;
}
