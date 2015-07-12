import react from 'react';

import { clone } from 'lodash'


class EventCollector extends react.Component {
  propTypes: {
    types: react.PropTypes.arrayOf.string.isRequired,
    log: react.PropTypes.array.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this._handleEvent = this._handleEvent.bind(this);
  }

  _handleEvent(e) {
    let snapshot = clone(e);
    this.props.log.push(snapshot);
  }

  render() {
    var props = {}
    for (var type of this.props.types) {
      props[type] = this._handleEvent;
    }

    return react.createElement('div', props, this.props.children);
  }
}


export default EventCollector;
