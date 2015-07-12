import react from 'react'

import { clone } from 'lodash'


class EventStopper extends react.Component {
  propTypes: {
    types: react.PropTypes.arrayOf.string.isRequired,
    log: react.PropTypes.array
  }

  constructor(props, context) {
    super(props, context);

    this._handleEvent = this._handleEvent.bind(this);
  }

  _handleEvent(e) {
    e.stopPropagation();

    if (this.props.log) {
      let snapshot = clone(e);
      this.props.log.push(snapshot);
    }
  }

  render() {
    var props = {}
    for (var type of this.props.types) {
      props[type] = this._handleEvent;
    }

    return react.createElement('div', props, this.props.children);
  }
}


export default EventStopper;
