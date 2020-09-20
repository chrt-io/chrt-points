export default function memoize(func) {
  const cache = {};

  return function() {
    // // // console.log('CURRENT CACHE', cache);
    const args = Array.prototype.slice.call(arguments);
    const key = JSON.stringify({ func: func.name, args });
    if (cache[key]) {
      // // // console.log('MEMOIZE USING CACHE', arguments, cache);
      return cache[key];
    } else {
      // // // console.log('MEMOIZE NO CACHE', arguments);
      const val = func.apply(null, arguments);
      cache[key] = val;
      return val;
    }
  };
}
