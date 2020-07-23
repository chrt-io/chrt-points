/**
 * node - Returns the DOM element that contains a chart element
 *
 * @param {type} node Set this as root node
 *
 * @return {type} Description
 */
export default function (node) {
  if (!node) {
    return this.g || this.root;
  }
  this.root = node;
  this.currentNode = this.root;

  return this;
}
