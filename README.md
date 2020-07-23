# Exploration

In this project we will explore ideas about what and how to create these charts

## CHRT
Opinionated charts

### How to build

####  Install the dependencies
```
npm install
```

####  Build the package
```
npm build
```

### Use it as a module

####  Create a global node module
```
npm link
```
This creates `chrt` module inside your global `node_modules` so that you can import it with `import Chrt from 'chrt'`

####  Use the module in a different app
```
npm link chrt
```
This will create a sym link to the module created in your global.

### Use it in your code
After having sym-linked the node you can use it as usual
```
import Chrt, {chrtPoints, chrtLine} from 'chrt';
```

### Developing
If you want to develop and see the changes reloaded live into another app you can use the watch script
```
npm run watch
```

### Testing

#### Unit test with Jest
Run `npm run test` to run all the tests on the code with Jest.
```
npm run test
```

To run only one test:
```
npx jest test/scales/scaleLinear.test.js
```
