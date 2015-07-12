import react from 'react/addons';
let reactTestUtils = react.addons.TestUtils;

import EventCollector from '../../../src/react/components/event-collector';
import EventStopper from '../../../src/react/components/event-stopper';


describe('EventCollector', () => {
  it('should capture events of the given type from a direct child', () => {
    let log = [];
    let event_collector = react.createElement(EventCollector, {
      types: [ 'onMouseDown' ],
      log: log
    },
      react.createElement('div')
    );

    let component = reactTestUtils.renderIntoDocument(event_collector);
    let rendering = react.findDOMNode(component);

    reactTestUtils.Simulate.mouseDown(rendering.firstChild, {
      type: 'mousedown'
    });
    expect(log).to.have.length(1);
    expect(log[0].type).to.be('mousedown');
  });


  it('should capture events from a deeper-level child', () => {
    let log = [];
    let event_collector = react.createElement(EventCollector, {
      types: [ 'onMouseDown' ],
      log: log
    },
      react.createElement('div', null,
        react.createElement('div', null)
      )
    );

    let component = reactTestUtils.renderIntoDocument(event_collector);
    let rendering = react.findDOMNode(component);

    reactTestUtils.Simulate.mouseDown(rendering.firstChild.firstChild, {
      type: 'mousedown'
    });
    expect(log).to.have.length(1);
    expect(log[0].type).to.be('mousedown');
  });


  it('should capture events of multiple given types', () => {
    let log = [];
    let event_collector = react.createElement(EventCollector, {
      types: [ 'onMouseDown', 'onMouseUp' ],
      log: log
    },
      react.createElement('div')
    );

    let component = reactTestUtils.renderIntoDocument(event_collector);
    let rendering = react.findDOMNode(component);

    reactTestUtils.Simulate.mouseDown(rendering.firstChild, {
      type: 'mousedown'
    });
    reactTestUtils.Simulate.mouseUp(rendering.firstChild, {
      type: 'mouseup'
    });
    expect(log).to.have.length(2);
    expect(log[0].type).to.be('mousedown');
    expect(log[1].type).to.be('mouseup');
  });


  it('should not capture event of which propagation has been stopped', () => {
    let log = [];
    let event_collector = react.createElement(EventCollector, {
      types: [ 'onMouseDown' ],
      log: log
    },
      react.createElement(EventStopper, {
        types: [ 'onMouseDown' ]
      })
    );

    let component = reactTestUtils.renderIntoDocument(event_collector);
    let rendering = react.findDOMNode(component);

    reactTestUtils.Simulate.mouseDown(rendering.firstChild, {
      type: 'mousedown'
    });
    expect(log).to.have.length(0);
  });
});
