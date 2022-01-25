const DEFAULT_POINT_RADIUS = 3;

export const circle = (point, cx = 0, cy = 0, r = DEFAULT_POINT_RADIUS) => {
  point.setAttribute('cx', cx);
  point.setAttribute('cy', cy);
  point.setAttribute('r', Math.max(0, isNaN(r) ? 0 : r));
}

export const square = (point, x = 0, y = 0, r = DEFAULT_POINT_RADIUS) => {
  const path = `M${x - r},${y - r}h${r * 2}v${r * 2}h${-r * 2}Z`;
  point.setAttribute('d', path);
}

export const plus = (point, x = 0, y = 0, r = DEFAULT_POINT_RADIUS) => {
  const path = `M${x},${y - r}v${r * 2}M${x - r},${y}h${r * 2}Z`;
  point.setAttribute('d', path);
}

export const times = (point, x = 0, y = 0, r = DEFAULT_POINT_RADIUS) => {
  const path = `M${x-r},${y - r}l${r * 2},${r * 2}m${0},${-r * 2}l${-r * 2},${r * 2}`;
  point.setAttribute('d', path);
}

export const custom = (point, path) => {
  point.setAttribute('d', path);
}

export const text = (point, text, r) => {
  point.setAttribute('x', 0);
  point.setAttribute('y', 0);
  point.setAttribute('text-anchor', 'middle');
  point.setAttribute('dominant-baseline', 'middle');
  point.setAttribute('font-size', r);
  point.textContent = text;
}
