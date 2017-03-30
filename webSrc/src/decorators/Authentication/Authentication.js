import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import getJwtFromLocalStorage from '../../utils/getJwtFromLocalStorage';

export default function (ComposedComponent) {
  @connect(
    () => ({}),
    { pushState: push }
  )
  class Authentication extends Component {
    static propTypes = {
      pushState: PropTypes.func
    }

    async componentWillMount() {
      // compare if login or not.
      const accToken = await getJwtFromLocalStorage();

      if (!accToken) {
        this.props.pushState('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Authentication;
}
