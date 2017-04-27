import { observable, computed, action } from 'mobx';

class Auth {
  @observable isLogin = false;

  @computed get loginState() {
    return this.isLogin;
  }

  @action login = (account, password) => {
    if (account === 'admin' && password === 'admin') {
      this.isLogin = true;
    }

    return this.isLogin;
  }
}

export default new Auth();
