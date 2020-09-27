import chrtGeneric from '../chrtGeneric';
import { isNull } from '~/helpers';
import {
  color,
  position,
  top,
  left,
  align,
  valign,
} from './lib';
import { create } from '~/layout';

function chrtAnnotation(text) {
  chrtGeneric.call(this);
  // console.log('HI WE ARE MARKERS', this);
  this.type = 'label';
  this.div = null;
  this.text = text;
  this._fill = null;
  this._position = {};
  this._alignment = {
    horizontal: 'start',
    vertical: '0.25em',
  }

  // console.log('chrtAnnotation', this)

  this.draw = () => {
    if (!this.parentNode.scales) {
      return this.parentNode;
    }

    if (!this.div) {
      this.div = create('div');
      this.parentNode.root.appendChild(this.div);
      this.div.style.position = 'absolute';
      this.div.className = 'chrt-annotation';
    }

    const { scales } = this.parentNode;

    // console.log('chrtAnnotation', this._position)

    if(scales && scales['x']) {
      const x = isNull(this._position.x) ? 0 : scales['x'](this._position.x);
      // if y is not defined by the user, it should be calculated based on the closest Y value based on X
      const y = isNull(this._position.y) ? 0 : scales['y'](this._position.y);


      this.div.style.left = `${x}px`;
      this.div.style.top = `${y}px`;
    }

    let label = this.div.querySelector('span');

    if (!label) {
      label = create('span');
      label.setAttribute('data-id', `annotation-${this.text}`);
      this.div.appendChild(label);
    }

    label.innerHTML = text;

    // label.setAttribute('fill', this._fill || this.parentNode.stroke || DEFAULT_FILL_COLOR)
    // label.textContent = this.text;
    //
    // label.setAttribute('text-anchor', this._alignment.horizontal)
    // label.setAttribute('dy', this._alignment.vertical)
  }
}

chrtAnnotation.prototype = Object.create(chrtGeneric.prototype);
chrtAnnotation.prototype.constructor = chrtAnnotation;
chrtAnnotation.parent = chrtGeneric.prototype;

chrtAnnotation.prototype = Object.assign(chrtAnnotation.prototype, {
  color,
  position,
  top,
  left,
  align,
  valign,
});

export default chrtAnnotation;
