import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import { authActions } from 'redux_flow/actions/';
import { Header, Footer } from 'components/';
import './Login.less';

@connect(
  state => ({
    authReducer: state.auth,
  }), {
    ...authActions,
  }
)
export default class Login extends Component {
  static propTypes = {
    authReducer: PropTypes.shape({}),
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
    const { authReducer } = this.props;

    return (
      <div>
        <Header />
        <article className="appContent">
          <Form className="content">
            {
              authReducer.error &&
              <Alert color="danger">
                <strong>{authReducer.error}</strong>
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
        </article>
        <Footer />
      </div>
    );
  }
}
