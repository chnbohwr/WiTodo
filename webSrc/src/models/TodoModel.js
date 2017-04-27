import {observable, action} from 'mobx';

export default class TodoModel {

  store;
  @observable text;
  @observable timeStamp;
  @observable isEditMode = false;

  constructor(store, item) {
    this.store = store;
    this.text = item.text;
    this.timeStamp = item.timeStamp;
  }

  @action destroy = () => {
    this.store.todoList.remove(this);
  }

  @action edit = () => {
    this.isEditMode = true;
  }

  @action updateText = (text) => {
    this.text = text;
    this.isEditMode = false;
  }

  // remove observable
  // toJS() {
  //   return {
  //     id: this.id,
  //     text: this.text,
  //     timeStamp: this.timeStamp
  //   };
  // }

  // add observable
  // static fromJS(store, object) {
  //   return new TodoModel(store, object.id, object.text, object.timeStamp);
  // }
}
