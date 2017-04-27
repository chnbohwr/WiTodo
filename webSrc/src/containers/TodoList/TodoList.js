/**
 * Created by Min on 2017/2/9.
 */
import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import './TodoList.less';

@inject(store => ({ todoStore: store.todoStore}))
@observer
export default class TodoList extends Component {

  static propTypes = {
    // loginRequest: PropTypes.func,
    todoStore: PropTypes.shape({
      todoList: PropTypes.array,
      addItem: PropTypes.func,
      removeItem: PropTypes.func,
      detail: PropTypes.func,
      setDetailId: PropTypes.func
    }),
  }

  state = {
    todoValue: '',
  }

  onPress = (event) => {
    if (event.key === 'Enter' && !!event.target.value) {
      const param = {
        text: event.target.value,
        timeStamp: Date.now(),
      };
      this.setState({
        todoValue: ''
      }, this.props.todoStore.addItem(param));
    }
  }

  remove = (index) => {
    this.props.todoStore.removeItem(index);
  }

  handleChange = (e) => {
    this.setState({
      todoValue: e.target.value
    });
  }

  render() {
    const { todoList, detail } = this.props.todoStore;

    return (
      <div className="todo-container">
        <ul>
          <li>
            <input
              type="text"
              placeholder="Please input"
              onKeyPress={this.onPress}
              onChange={this.handleChange}
              value={this.state.todoValue} />
          </li>
          {
            todoList.map((val, key) => (
              <li className="list" key={val.timeStamp}>
                {val.text}
                <div>
                  <button
                    onClick={action(() => { this.props.todoStore.setDetailId = key; })}
                   >Show Detail</button>
                  <button
                    onClick={() => this.remove(key)}
                  >&times;</button>
                </div>
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

