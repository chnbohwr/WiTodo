/**
 * Created by Min on 2017/2/9.
 */
import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

import './TodoList.less';

@inject(store => ({ todoStore: store.todoStore}))
@observer
export default class TodoList extends Component {

  static propTypes = {
    todoStore: PropTypes.shape({
      todoList: PropTypes.shape({}),
      addItem: PropTypes.func,
      removeItem: PropTypes.func,
      detail: PropTypes.func,
      setDetailId: PropTypes.func,
    }),
  }

  @action onPress = (event) => {
    if (event.key === 'Enter' && !!this.todoValue) {
      const param = {
        text: this.todoValue,
        timeStamp: Date.now(),
      };
      this.todoValue = '';
      this.props.todoStore.addItem(param);
    }
  }

  onSaveEdit = (event, todo) => {
    if (event.key === 'Enter' && !!event.target.value) {
      todo.updateText(event.target.value);
    }
  }

  remove = (index) => {
    this.props.todoStore.removeItem(index);
  }

  @observable todoValue = '';

  render() {
    const { todoList, detail, setDetailId } = this.props.todoStore;

    return (
      <div className="todo-container">
        <ul>
          <li>
            <input
              type="text"
              placeholder="Please input"
              onKeyPress={this.onPress}
              onChange={action((e) => { this.todoValue = e.target.value; })}
              value={this.todoValue} />
          </li>
          {
            todoList.map((todo, key) => (
              <li className="list" key={todo.timeStamp}>
                {
                  !todo.isEditMode
                  ? todo.text
                  : <input onKeyPress={e => this.onSaveEdit(e, todo)} defaultValue={todo.text} />
                }
                {
                  !todo.isEditMode &&
                  <div>
                    <button
                      onClick={todo.edit}
                    >Edit</button>
                    <button
                      onClick={() => setDetailId(key)}
                    >Detail</button>
                    <button
                      onClick={todo.destroy}
                    >&times;</button>
                  </div>
                }
              </li>
            ))
          }
        </ul>
        <div className="todo-detail">
          {detail}
        </div>
      </div>
    );
  }
}

