# I Am Testing

This is a list of testing tips, techniques and tools that help me test JS code.

## Installation & Usage

```
npm install iamtesting
```

To use the tools provided by this library, simply import it into your project.

```
// ES7, babel
import iamtesting from 'iamtesting';

// ES6, node.js
var iamtesting = require('iamtesting');
```

## Tools

- [`react`](./src/react/)
  - [`EventCollector`](./src/react/components/event-collector.js)
  - [`EventStopper`](./src/react/components/event-stopper.js)

## Tips and Tools

- [React Component Testing](./tips/react-component-testing.md)

## Test Runners

- [mochajs](http://mochajs.org)
- [karma](http://karma-runner.github.io)

## Assertion Utilities

- [expect.js](https://github.com/Automattic/expect.js)
