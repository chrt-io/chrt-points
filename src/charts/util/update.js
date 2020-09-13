export default function update() {
  if(this.parentNode.scales['x'] && this.parentNode.scales['y']) {
    console.log('UPDATE THEN DRAW')
    this.draw();
  }
}
