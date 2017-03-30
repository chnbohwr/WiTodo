import React, { Component, PropTypes } from 'react';
import { presets, RouteTransition } from 'react-router-transition';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.shape({}),
    location: PropTypes.shape({}),
  }

  render() {
    const { location: {pathname} } = this.props;

    return (
      <div>
        <RouteTransition
          className="transition-wrapper"
          pathname={pathname}
          {...presets.pop}
        >
          {this.props.children}
        </RouteTransition>
      </div>
    );
  }
}
