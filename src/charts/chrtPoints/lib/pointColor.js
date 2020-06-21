export default function pointColor(value) {
  if(!value) {
    return this.fill;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.fill = value;
  }
  return this;
}
