# chrt-points

Component for creating point-based visualizations in chrt, such as scatter plots, bubble charts, and point charts. Points can be customized in size, shape, color, and other visual properties to represent additional dimensions of data.

The component provides flexible ways to create:

- Scatter Plots (points with fixed size)
- Bubble Charts (points with size based on data)
- Custom Point Charts (points with different shapes and rotations)

### Observable Examples and Documentation:

- [Chrt Scatter Plots - Observable](https://observablehq.com/@chrt/scatter-plots?collection=@chrt/chrt)
- [Introducing Chrt - Observable](https://observablehq.com/@chrt/introducing-chrt?collection=@chrt/chrt)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, `chrt-points` can be installed as a standalone module via a package manager such as Yarn or npm.

```bash
npm install chrt-points chrt-core
```

`chrt-points` can be used as part of the `chrt` package:

```bash
npm install chrt
```

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)

```js
import Chrt from "chrt-core";
import { chrtPoints } from "chrt-points";

// Create a basic scatter plot
Chrt()
  .data([
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 1 },
  ])
  .add(chrtPoints());

// Create a bubble chart
Chrt().add(
  chrtPoints()
    .data(data)
    .size((d) => d.value),
);
```

## API Reference

### Point Properties

#### `.radius([value])` / `.size([value])`

Sets the radius or size of points. Size can be fixed or determined by data.

```js
// Fixed size
chrtPoints().radius(5);

// Size based on data value
chrtPoints().size((d) => d.population);

// Size with custom scale
chrtPoints().size({
  range: [2, 20],
  field: "population",
});
```

#### `.symbol([type[, option]])`

Sets the symbol type for points. Available symbols: 'circle' (default), 'square', 'text', 'custom'.

```js
// Use square symbols
chrtPoints().symbol("square");

// Use text as symbols
chrtPoints().symbol("text", "A");

// Custom symbol
chrtPoints().symbol("custom", "M 0,0 L 10,10");
```

#### `.rotate([angle])`

Sets the rotation angle of points in degrees.

```js
// Fixed rotation
chrtPoints().rotate(45);

// Rotation based on data
chrtPoints().rotate((d) => d.angle);
```

### Styling

#### `.color([value])` / `.fill([value])`

Sets the fill color of points.

```js
// Single color
chrtPoints().fill("#ff0000");

// Color based on data
chrtPoints().fill((d) => (d.value > 100 ? "#ff0000" : "#0000ff"));
```

#### `.stroke([value])` / `.strokeWidth([value])`

Sets the stroke color and width of points.

```js
// Set stroke color and width
chrtPoints().stroke("#000000").strokeWidth(2);
```

#### `.opacity([value])` / `.strokeOpacity([value])`

Sets the opacity of point fill and stroke.

```js
// Set fill and stroke opacity
chrtPoints().opacity(0.7).strokeOpacity(0.5);
```

### Examples

#### Basic Scatter Plot

```js
Chrt().add(
  chrtPoints()
    .data(data)
    .radius(5)
    .fill("#336699")
    .stroke("#000")
    .strokeWidth(1),
);
```

#### Bubble Chart

```js
Chrt().add(
  chrtPoints()
    .data(data)
    .size((d) => d.population)
    .fill((d) => (d.category === "A" ? "#ff0000" : "#0000ff"))
    .opacity(0.7)
    .stroke("#333"),
);
```

#### Custom scale for size

Define a custom scale for the size of the points, with a domain and a range and a scaling function.

```js
Chrt()
  .scale({
    name: "r",
    range: [0, 50],
    domain: [0, 10000],
    scale: "sqrt",
    field: "population",
    type: "other",
  })
  .add(
    chrtPoints()
      .data(data)
      .size({ scale: "r" })
      .fill((d) => (d.category === "A" ? "#ff0000" : "#0000ff"))
      .opacity(0.7)
      .stroke("#333"),
  );
```

#### Custom Symbols

```js
Chrt().add(
  chrtPoints().data(data).symbol("square").rotate(45).size(8).fill("#ff6600"),
);
```

#### Points with Multiple Visual Encodings

The dataset could encode multiple visual encodings, such as size, color, opacity, symbol, and rotation based on the single data point.

```js
Chrt().add(
  chrtPoints()
    .data(data)
    .size((d) => d.value) // size encodes value
    .fill((d) => d.category) // color encodes category
    .opacity((d) => d.confidence) // opacity encodes confidence
    .symbol((d) => d.type) // symbol encodes type
    .rotate((d) => d.direction), // rotation encodes direction
);
```
