import jsdom from 'jsdom';


beforeEach((callback) => {
  if (typeof global.window !== 'undefined') {
    return callback();
  }

  global.navigator = {
    userAgent: 'node.js'
  };

  jsdom.env('', [], (errs, window) => {
    global.window = window;
    global.document = window.document;

    callback();
  });
});


afterEach(function () {
  delete global.document;
  delete global.window;
  delete global.navigator;
});
