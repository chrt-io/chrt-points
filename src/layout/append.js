export default function append(d) {
  if (typeof d === 'string') {
    const node = document.createElement(d);
    const currentNode = this.currentNode || this.root;
    currentNode.appendChild(node);
    this.currentNode = node;
  }
  return this;
}

/*
export default function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
*/
