import expect from 'expect.js';


beforeEach(() => {
  global.expect = expect;
});

afterEach(() => {
  delete global.expect;
});
