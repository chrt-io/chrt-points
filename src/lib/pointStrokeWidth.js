export default function pointStrokeWidth(value) {
  if(!value) {
    return this.strokeWidth;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.strokeWidth = value;
  }
  return this;
}
