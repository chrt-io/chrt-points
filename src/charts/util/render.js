import { createSVG as create } from '../../layout';

export default function render() {
  this.g = create('g');
  this.currentNode.appendChild(this.g);

  this.update();
  return this.parentNode;
}
