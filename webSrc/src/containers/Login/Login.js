'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Header, Footer } from 'components/';
import { observer, inject } from 'mobx-react';
// import { observable, action } from 'mobx';
import './Login.less';

@inject(store => ({ authStore: store.authStore }))
@observer
export default class Login extends Component {

  static propTypes = {
    // loginRequest: PropTypes.func,
    authStore: PropTypes.shape({
      login: PropTypes.func,
      isLogin: PropTypes.bool
    }),
    router: PropTypes.shape({
      push: PropTypes.func
    })
  }

  constructor() {
    super();
    this.state = {
      account: '',
      password: '',
    };
  }

  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  }

  handleLogin = () => {
    const { account, password } = this.state;
    const { authStore: {login} } = this.props;

    if (login(account, password)) {
      this.props.router.push('/todo');
    }
  }

  render() {
    const { account, password } = this.state;

    return (
      <div>
        <Header />
        <article className="appContent">
          <Form className="content">
            <FormGroup>
              <Input
                type="text"
                placeholder="Account"
                value={account}
                onChange={e => this.handleChange(e, 'account')}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => this.handleChange(e, 'password')}
              />
            </FormGroup>
            <Button type="button" color="primary" onClick={this.handleLogin} >Login</Button>
          </Form>
        </article>
        <Footer />
      </div>
    );
  }
}
