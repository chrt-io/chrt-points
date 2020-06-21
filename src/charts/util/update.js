export default function update() {
  if(this.parentNode.scales['x'] && this.parentNode.scales['y']) {
    this.draw();
  }
}
