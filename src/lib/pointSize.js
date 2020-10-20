export default function pointSize(value) {
  if(!value) {
    return this.size;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.size = value;
  }
  return this;
}
