import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import { loginActions } from 'redux_flow/actions/';
import './Login.less';

@connect(
  state => ({
    loginReducer: state.login,
  }), {
    ...loginActions,
  }
)
export default class Login extends Component {
  static propTypes = {
    loginReducer: PropTypes.shape({}),
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
    const { loginReducer } = this.props;

    return (
      <Form className="content">
        {
          loginReducer.error &&
          <Alert color="danger">
            <strong>{loginReducer.error}</strong>
          </Alert>
        }
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
        {' '}
        <Button type="button" color="primary" onClick={this.handleLogin}>Login</Button>
      </Form>
    );
  }
}
