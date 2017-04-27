import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Header, Footer } from 'components/';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import './Login.less';

// @inject(store => ({ authStore: store.authStore }))
@inject('authStore', 'todoStore')
@observer
export default class Login extends Component {

  static propTypes = {
    // loginRequest: PropTypes.func,
    authStore: PropTypes.shape({
      login: PropTypes.func,
      isLogin: PropTypes.bool,
      isError: PropTypes.bool
    }),
    router: PropTypes.shape({
      push: PropTypes.func
    })
  }

  @observable account = '';
  @observable password = '';

  // constructor() {
  //   super();
  //   this.state = {
  //     account: '',
  //     password: '',
  //   };
  // }

  // handleChange = (e, type) => {
  //   this.setState({
  //     [type]: e.target.value,
  //   });
  // }

  handleLogin = () => {
    // const { account, password } = this.state;
    // const { authStore: {login} } = this.props;

    if (this.props.authStore.login(this.account, this.password)) {
      this.props.router.push('/todo');
    }
  }

  render() {

    return (
      <div>
        <Header />
        <article className="appContent">
          <Form className="content">
            <FormGroup>
              <Input
                type="text"
                placeholder="Account"
                value={this.account}
                onChange={action((e) => { this.account = e.target.value; })}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                value={this.password}
                onChange={action((e) => { this.password = e.target.value; })}
              />
            </FormGroup>
            {this.props.authStore.isError && <div className="login-error">Login Failed.</div>}
            <Button type="button" color="primary" onClick={this.handleLogin} >Login</Button>
          </Form>
        </article>
        <Footer />
      </div>
    );
  }
}
