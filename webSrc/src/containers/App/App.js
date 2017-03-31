import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { presets, RouteTransition } from 'react-router-transition';
import { authActions } from 'redux_flow/actions';
import { Header, Footer } from 'components/';
import './App.less';

@connect(
  () => ({}),
  { ...authActions }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.shape({}),
    location: PropTypes.shape({}),
    logoutRequest: PropTypes.func,
  }

  render() {
    const { location: {pathname}, logoutRequest } = this.props;

    return (
      <div>
        <Header
          handleLogout={logoutRequest}
        />
        <div className="appContent">
          <RouteTransition
            className="transition-wrapper"
            pathname={pathname}
            {...presets.pop}
          >
            {this.props.children}
          </RouteTransition>
        </div>
        <Footer />
      </div>
    );
  }
}
