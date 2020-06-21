export default function rollup() {
  if (this.currentNode.parentNode) {
    this.currentNode = this.currentNode.parentNode;
  }
  return this;
}
