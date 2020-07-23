import { createSVG as create } from '../../layout';
import { hasData } from '~/helpers';

export default function render() {
  this.g = create('g');

  console.log('RENDER', this, this.parentNode.objects)

  if(hasData(this)) {
    // series
    this.currentNode.append(this.g);
  } else {
    if(this.type === 'axis') {
      const grid = this.parentNode.objects.slice().reverse().find(obj => obj.type === 'grid');
      if(grid) {
        this.currentNode.insertBefore(this.g, grid.node().nextSibling);
      } else {
        this.currentNode.prepend(this.g);
      }
    } else {
      this.currentNode.prepend(this.g);
    }

  }
  this.update();
  return this.parentNode;
}
