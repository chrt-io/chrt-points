# Example of Chrt in action

### Set up the simplest empty chart
![Screenshot_2020-07-19_at_12.07.50_pm](/uploads/58b2de25fbf8a815baa7593729aa4b35/Screenshot_2020-07-19_at_12.07.50_pm.png)
```
import Chrt from "chrt";

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .size(WIDTH, HEIGHT)
```

### Set up the an empty chart with default Axes
![Screenshot_2020-07-19_at_12.10.08_pm](/uploads/ea9f8aaa8cc6271330ebdb665fcc3655/Screenshot_2020-07-19_at_12.10.08_pm.png)
```
import Chrt from "chrt";

const chart = new Chrt();

const WIDTH = 600;
const HEIGHT = 300;

chart
  .node(document.getElementById("root"))
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new xAxis())
  .add(new yAxis())
```

### Add data to a chart
![Screenshot_2020-07-19_at_12.14.31_pm](/uploads/c0cecb67e7e058ad66396191285e7b13/Screenshot_2020-07-19_at_12.14.31_pm.png)
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis
} from "chrt";

const samplesWithNumbers = [];
for (let i = 0; i < 100; i += 1) {
  samplesWithNumbers[i] = Math.random() * 100;
}

const WIDTH = 600;
const HEIGHT = 300;

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
![Screenshot_2020-07-19_at_12.16.37_pm](/uploads/39e54535d4d2073e7fb4ce5cf79a90be/Screenshot_2020-07-19_at_12.16.37_pm.png)
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  chrtLine
} from "chrt";

const samplesWithNumbers = [];
for (let i = 0; i < 100; i += 1) {
  samplesWithNumbers[i] = Math.random() * 100;
}

const WIDTH = 600;
const HEIGHT = 300;

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
![Screenshot_2020-07-19_at_12.17.16_pm](/uploads/968794ed2ed167d6ee9ad92797586fbc/Screenshot_2020-07-19_at_12.17.16_pm.png)
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const WIDTH = 600;
const HEIGHT = 300;

const samplesWithNumbers = [];
for (let i = 0; i < 100; i += 1) {
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
![Screenshot_2020-07-19_at_12.22.35_pm](/uploads/eaebe11283d6e64686e36885456ece73/Screenshot_2020-07-19_at_12.22.35_pm.png)
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const WIDTH = 600;
const HEIGHT = 300;

const samplesWithNumbers = [];
for (let i = 0; i < 100; i += 1) {
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
![Screenshot_2020-07-19_at_1.40.40_pm](/uploads/10ed60e0179d3824b8da530bece6fa35/Screenshot_2020-07-19_at_1.40.40_pm.png)
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const WIDTH = 600;
const HEIGHT = 300;

const samplesWithNumbers = [];
for (let i = 0; i < 100; i += 1) {
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
![Screenshot_2020-07-19_at_1.21.12_pm](/uploads/fcf5aea125019f9f7972a2aa5d492014/Screenshot_2020-07-19_at_1.21.12_pm.png)
```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine
} from "chrt";

const WIDTH = 600;
const HEIGHT = 300;

const samplesWithObjects = [];
for (let i = 0; i < 100; i += 1) {
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
![Screenshot_2020-07-19_at_1.25.04_pm](/uploads/0abfd40b7bec3beb0c603db3918d3687/Screenshot_2020-07-19_at_1.25.04_pm.png)
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
for (let i = 0; i < 100; i += 1) {
  samplesWithObjects[i] = {
    x: i,
    y: Math.random() * 100,
    y2: -0.5 * Math.random() * 100,
  };
}

const WIDTH = 600;
const HEIGHT = 300;

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

### Add  markers to a line chart
By using the `.add()` method of the `chrtGeneric` components, it is possible to add modules to visualize more information specific to a single chart component, for example markers or labels.

![Screenshot_2020-09-13_at_11.25.06_am](/uploads/8e8325a9d4ffc255e90e4a1c78ff3bf5/Screenshot_2020-09-13_at_11.25.06_am.png)

```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine,
  chrtMarkers,
} from "chrt";

const WIDTH = 600;
const HEIGHT = 300;

const samplesWithNumbers = [];
for (let i = 0; i < 20; i += 1) {
  samplesWithNumbers[i] = Math.random() * 10;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new yAxis())
  .add(new chrtLine().add(new chrtMarkers()))
```

### Show only first and last markers

![Screenshot_2020-09-13_at_11.34.06_am](/uploads/668f524c55168f2a025e9ee8c0d2eb63/Screenshot_2020-09-13_at_11.34.06_am.png)

```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine,
  chrtMarkers,
} from "chrt";

const WIDTH = 600;
const HEIGHT = 300;

const samplesWithNumbers = [];
for (let i = 0; i < 20; i += 1) {
  samplesWithNumbers[i] = Math.random() * 10;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new yAxis())
  .add(new chrtLine().add(new chrtMarkers().firstAndLastMarkers()))
```

### Paint first and last markers with different color/size

![Screenshot_2020-09-13_at_11.28.19_am](/uploads/8e1c1220405761d38b4810d2602debda/Screenshot_2020-09-13_at_11.28.19_am.png)

```
import Chrt from "chrt";
import {
  xAxis,
  yAxis,
  horizontalGrid,
  verticalGrid,
  chrtLine,
  chrtMarkers,
} from "chrt";

const WIDTH = 600;
const HEIGHT = 300;

const samplesWithNumbers = [];
for (let i = 0; i < 20; i += 1) {
  samplesWithNumbers[i] = Math.random() * 10;
}

const chart = new Chrt();

chart
  .node(document.getElementById("root"))
  .data(samplesWithNumbers)
  .size(WIDTH, HEIGHT)
  .svg()
  .add(new yAxis())
  .add(new chrtLine()
    .add(new chrtMarkers().firstMarker().size(8))
    .add(new chrtMarkers().lastMarker().fill('#f00').size(12))
  )
```
