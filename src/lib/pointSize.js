// pointRadius has only one modality: radius length in pixel
export function pointRadius(value) {
  return this.attr('radius', value);
}

// pointSize has 2 modalities:
// 1. pass the size in px, the radius will be calculated as a sqrt function of the area
// 2. pass the size in value and scale options, this will calculate the radius with a custom
//    srqt scale
export function pointSize(value, options) {
  return this.attr('size', options ? { value, options } : value);
}
