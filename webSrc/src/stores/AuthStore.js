import { observable, computed, action } from 'mobx';

class Auth {
  @observable isLogin = false;
  @observable isError = false;

  @computed get loginState() {
    return this.isLogin;
  }

  login = (account, password) => {
    if (account === 'admin' && password === 'admin') {
      this.isLogin = true;
    } else {
      this.isError = true;
    }
    return this.isLogin;
  }
}

export default new Auth();
