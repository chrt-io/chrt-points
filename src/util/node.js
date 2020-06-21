export default function (node) {
  if (!node) {
    return this.root;
  }
  this.root = node;
  this.currentNode = this.root;

  return this;
}
