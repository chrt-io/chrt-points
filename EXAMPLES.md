# Example of Chrt in action

### Set up the simplest empty chart
```
import Chrt from "chrt";

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .size(WIDTH, HEIGHT)
```

### Set up the an empty chart with default Axes
```
import Chrt from "chrt";

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new xAxis())
  .add(new yAxis())
```

### Add data to a chart
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis
} from "chrt";

const samplesWithNumbers = [];
for (let i = 0; i < 100;  += 1) {
  samplesWithNumbers[i] = Math.random() * 100;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new xAxis())
  .add(new yAxis())
```

### Add series to a chart
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  chrtLine
} from "chrt";

const samplesWithNumbers = [];
for (let i = 0; i < 100;  += 1) {
  samplesWithNumbers[i] = Math.random() * 100;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new xAxis())
  .add(new yAxis())
  .add(new chrtLine()
```

### Add grid to a chart
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const samplesWithNumbers = [];
for (let i = 0; i < 100;  += 1) {
  samplesWithNumbers[i] = Math.random() * 100;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new xAxis())
  .add(new yAxis())
  .add(new horizontalGrid())
  .add(new verticalGrid())
  .add(new chrtLine())
```

### Customize the look of a chart
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const samplesWithNumbers = [];
for (let i = 0; i < 100;  += 1) {
  samplesWithNumbers[i] = Math.random() * 100;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .margins({
    top: 30,
    bottom: 20,
    left: 10,
    right: 10
  })
  .padding({
    top: 0, // not working yet
    bottom: 0, // not working yet
    left: 30,
    right: 0
  })
  .svg()
  .add(
    new xAxis()
      .color("#666")
      .showAxis()
      .width(4)
      .setTickLength(5)
      .width(1) // you can override previous calls
      .orient('bottom')
  )
  .add(
    new yAxis()
      .color("#333")
      .width(1)
      .setTickLength(5)
      .setTickPosition("outside")
      .orient('left')
      .hideAxis()
  )
  .add(new horizontalGrid(16).color("#ddd").minor(false))
  .add(new verticalGrid(10).color("#ddd").minor(false))
  .add(new chrtLine().color("#F66").width(2))
```

### Add a second chart with new data
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const samplesWithNumbers = [];
for (let i = 0; i < 100;  += 1) {
  samplesWithNumbers[i] = Math.random() * 100;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .margins({
    top: 30,
    bottom: 20,
    left: 10,
    right: 10
  })
  .padding({
    top: 0, // not working yet
    bottom: 0, // not working yet
    left: 30,
    right: 0
  })
  .svg()
  .add(
    new xAxis()
      .color("#666")
      .showAxis()
      .width(4)
      .setTickLength(5)
      .width(1) // you can override previous calls
      .orient('bottom')
  )
  .add(
    new yAxis()
      .color("#333")
      .width(1)
      .setTickLength(5)
      .setTickPosition("outside")
      .orient('left')
      .hideAxis()
  )
  .add(new horizontalGrid(16).color("#ddd").minor(false))
  .add(new verticalGrid(10).color("#ddd").minor(false))
  .add(new chrtLine().color("#F66").width(2))
  .add(new chrtLine().data(samplesWithNumbers.map(d => d * 10)).color("#333").width(2))
```

### Use different fields from the data for each series
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const samplesWithObjects = [];
for (let i = 0; i < 100;  += 1) {
  samplesWithObjects[i] = {
    x: i,
    y: Math.random() * 100,
    y2: -0.5 * Math.random() * 100,
  };
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithObjects)
  .size(WIDTH, HEIGHT)
  .margins({
    top: 30,
    bottom: 20,
    left: 10,
    right: 10
  })
  .padding({
    top: 0, // not working yet
    bottom: 0, // not working yet
    left: 30,
    right: 0
  })
  .svg()
  .add(
    new xAxis()
      .color("#666")
      .showAxis()
      .width(4)
      .setTickLength(5)
      .width(1) // you can override previous calls
      .orient('bottom')
  )
  .add(
    new yAxis()
      .color("#333")
      .width(1)
      .setTickLength(5)
      .setTickPosition("outside")
      .orient('left')
      .hideAxis()
  )
  .add(new horizontalGrid(16).color("#ddd").minor(false))
  .add(new verticalGrid(10).color("#ddd").minor(false))
  .add(new chrtLine().color("#F66").width(2))
  .add(new chrtLine().y('y2').color("#333").width(2))
```

### Add  points to a chart
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const samplesWithObjects = [];
for (let i = 0; i < 100;  += 1) {
  samplesWithObjects[i] = {
    x: i,
    y: Math.random() * 100,
    y2: -0.5 * Math.random() * 100,
  };
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithObjects)
  .size(WIDTH, HEIGHT)
  .margins({
    top: 30,
    bottom: 20,
    left: 10,
    right: 10
  })
  .padding({
    top: 0, // not working yet
    bottom: 0, // not working yet
    left: 30,
    right: 0
  })
  .svg()
  .add(
    new xAxis()
      .color("#666")
      .showAxis()
      .width(4)
      .setTickLength(5)
      .width(1) // you can override previous calls
      .orient('bottom')
  )
  .add(
    new yAxis()
      .color("#333")
      .width(1)
      .setTickLength(5)
      .setTickPosition("outside")
      .orient('left')
      .hideAxis()
  )
  .add(new horizontalGrid(16).color("#ddd").minor(false))
  .add(new verticalGrid(10).color("#ddd").minor(false))
  .add(new chrtLine().color("#F66").width(2))
  .add(
    new chrtPoints()
      .pointSize(3)
      .color("#fff")
      .width(3)
      .strokeColor("#333")
  )
```
