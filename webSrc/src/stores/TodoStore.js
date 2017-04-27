import { observable, computed, action } from 'mobx';
import TodoModel from '../models/TodoModel';

class Todo {
  @observable todoList = [];
  @observable showDetailId = -1;

  @computed get detail() {
    if (!this.todoList.length || this.showDetailId === -1) return '';
    const detail = this.todoList[this.showDetailId];
    return `${this.showDetailId + 1}. ${detail.text} ---  新增時間：${new Date(detail.timeStamp).toLocaleString()}`;
  }

  @action setDetailId = (itemIndex) => {
    this.showDetailId = itemIndex;
  }

  @action addItem = (item) => {
    this.todoList.push(new TodoModel(this, item));
  }

}

export default new Todo();
