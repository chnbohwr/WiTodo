import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { presets, RouteTransition } from 'react-router-transition';
import { authActions, menuActions } from 'redux_flow/actions';
import { Header, Footer, Sidebar } from 'components/';
import './App.less';

@connect(
  state => ({
    menu: state.menu,
  }),
  { pushState: push, ...authActions, ...menuActions }
)
export default class App extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    children: PropTypes.shape({}),
    location: PropTypes.shape({}),
    logoutRequest: PropTypes.func,
    menu: PropTypes.shape({}),
    updateActiveItems: PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }

  redirect = (url) => {
    this.props.pushState(url);
  }

  render() {
    const { location: {pathname}, logoutRequest, menu, updateActiveItems } = this.props;

    return (
      <div>
        <Header
          showLogout
          handleLogout={logoutRequest}
        />
        <article className="appContent">
          <aside>
            <Sidebar
              redirect={this.redirect}
              updateActiveItems={updateActiveItems}
              menu={menu}
            />
          </aside>
          <section>
            <RouteTransition
              className="transition-wrapper"
              pathname={pathname}
              {...presets.pop}
            >
              {this.props.children}
            </RouteTransition>
          </section>
        </article>
        <Footer />
      </div>
    );
  }
}
