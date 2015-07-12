# React Component Testing

Note: The [React testing utilities](https://facebook.github.io/react/docs/test-utils.html) are very useful.

## Events

### Capturing event objects

Tools:

- [`EventCollector`](../src/react/components/event-collector.js) (a React component)

When there is a need to capture events dispatched on a component's DOM tree, a wrapping component may be very useful. React testing utilities do not return event objects from `Simulate` calls and this is probably the only clean way to check event object state.

```javascript
it('should prevent the default action on mousedown events', function () {
  // A mutable array for event logging.
  var log = [];
  var event_collector = react.createElement(EventCollector, { log }, [
    // The tested component
    react.createElement(TestedComponent)
  ]);

  var rendering = react.addons.TestUtils.renderIntoDocument(event_collector);

  // This call unfortunately does not return the dispatched event object.
  react.addons.TestUtils.Simulate.mouseDown(rendering);

  expect(log).to.have.length(1);
  expect(log[0].isDefaultPrevented()).to.be(true);
});
```
