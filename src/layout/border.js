export default function border() {
  if (this.currentNode) {
    this.root.querySelector('svg').style.border = '1px solid #000';
  }
  return this;
}
