import react from 'react/addons';
let reactTestUtils = react.addons.TestUtils;

import EventCollector from '../../../src/react/components/event-collector';
import EventStopper from '../../../src/react/components/event-stopper';


describe('EventStopper', () => {
  let createCollector = (type, log, ...children) => {
    return react.createElement(EventCollector, {
      types: [ type ],
      log: log
    }, ...children);
  };


  it('should stop events of the given type from a direct child', () => {
    let captureLog = [];
    let root = createCollector('onMouseDown', captureLog,
      react.createElement(EventStopper, {
        types: [ 'onMouseDown' ],
      },
        react.createElement('div')
      )
    );

    let component = reactTestUtils.renderIntoDocument(root);
    let rendering = react.findDOMNode(component);
    let firstLevelChildRendering = rendering.firstChild.firstChild;

    reactTestUtils.Simulate.mouseDown(firstLevelChildRendering, {
      type: 'mousedown'
    });
    expect(captureLog).to.have.length(0);
  });


  it('should stop events of the given type from its own rendering', () => {
    let captureLog = [];
    let root = createCollector('onMouseDown', captureLog,
      react.createElement(EventStopper, {
        types: [ 'onMouseDown' ],
      })
    );

    let component = reactTestUtils.renderIntoDocument(root);
    let rendering = react.findDOMNode(component);
    let stopperChildRendering = rendering.firstChild;

    reactTestUtils.Simulate.mouseDown(stopperChildRendering, {
      type: 'mousedown'
    });
    expect(captureLog).to.have.length(0);
  });


  it('should stop events of from a deeper-level child', () => {
    let captureLog = [];
    let root = createCollector('onMouseDown', captureLog,
      react.createElement(EventStopper, {
        types: [ 'onMouseDown' ],
      },
        react.createElement('div', null,
          react.createElement('div')
        )
      )
    );

    let component = reactTestUtils.renderIntoDocument(root);
    let rendering = react.findDOMNode(component);
    let deeperLevelChildRendering = rendering.firstChild.firstChild.firstChild;

    reactTestUtils.Simulate.mouseDown(deeperLevelChildRendering, {
      type: 'mousedown'
    });
    expect(captureLog).to.have.length(0);
  });


  it('should not stop events of a type not in the given list', () => {
    let captureLog = [];
    let root = createCollector('onMouseUp', captureLog,
      react.createElement(EventStopper, {
        types: [ 'onMouseDown' ],
      },
        react.createElement('div')
      )
    );

    let component = reactTestUtils.renderIntoDocument(root);
    let rendering = react.findDOMNode(component);
    let firstLevelChildRendering = rendering.firstChild.firstChild;

    reactTestUtils.Simulate.mouseUp(firstLevelChildRendering, {
      type: 'mouseup'
    });
    expect(captureLog).to.have.length(1);
    expect(captureLog[0].type).to.be('mouseup');
  });


  it('should add stopped events to the provided logging array', () => {
    let captureLog = [];
    let stopLog = [];
    let root = createCollector('onMouseDown', captureLog,
      react.createElement(EventStopper, {
        types: [ 'onMouseDown' ],
        log: stopLog
      },
        react.createElement('div')
      )
    );

    let component = reactTestUtils.renderIntoDocument(root);
    let rendering = react.findDOMNode(component);
    let firstLevelChildRendering = rendering.firstChild.firstChild;

    reactTestUtils.Simulate.mouseDown(firstLevelChildRendering, {
      type: 'mousedown'
    });
    expect(stopLog).to.have.length(1);
    expect(stopLog[0].type).to.be('mousedown');
  });
});
