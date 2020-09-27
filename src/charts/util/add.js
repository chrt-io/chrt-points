import { uuid } from '~/helpers';
export default function add(obj) {
  const id = obj._id || uuid();
  // console.log('adding to', this, obj.type, id, obj);
  obj
    .id(id)
    .parent(this)
    // .render();

  this.objects.push(obj);

  //return this.update();

  return this;
}
