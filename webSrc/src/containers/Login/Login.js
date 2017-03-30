import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { loginActions } from 'redux_flow/actions/';
import './Login.less';

@connect(
  () => ({

  }), {
    ...loginActions,
  }
)
export default class Login extends Component {
  static propTypes = {
    loginRequest: PropTypes.func,
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
    const { loginRequest } = this.props;
    loginRequest({account, password});
  }

  render() {
    const { account, password } = this.state;

    return (
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
            type="text"
            placeholder="Password"
            value={password}
            onChange={e => this.handleChange(e, 'password')}
          />
        </FormGroup>
        {' '}
        <Button type="button" color="primary" onClick={this.handleLogin}>Login</Button>
      </Form>
    );
  }
}
