export default function (obj) {
  if (!obj) {
    return this.parentNode;
  }
  this.parentNode = obj;
  return this;
}
