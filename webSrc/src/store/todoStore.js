import { observable, computed, action } from 'mobx';

class Todo {

  constructor() {
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  @observable todoList = [];
  @observable showDetailId = -1;

  @computed get detail() {
    if (!this.todoList.length || this.showDetailId === -1) return '';
    const detail = this.todoList[this.showDetailId];

    return `${this.showDetailId + 1}. ${detail.text} ---  新增時間：${new Date(detail.timeStamp).toLocaleString()}`;
  }

  set setDetailId(itemIndex) {
    this.showDetailId = itemIndex;
  }

  @action addItem(item) {
    this.todoList.push(item);
  }

  @action removeItem(itemIndex) {
    this.showDetailId = -1;
    this.todoList.splice(itemIndex, 1);
  }
}

export default new Todo();
