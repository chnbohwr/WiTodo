import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { todoListActions } from 'redux_flow/actions/';

import AddTodo from './components/AddTodo';
import TodoTable from './components/TodoTable';

@connect(
  state => ({
    todoList: state.todoList,
  }), {
    ...todoListActions,
  }
)
export default class TodoList extends Component {
  static propTypes = {
    todoList: PropTypes.shape,
    addTodo: PropTypes.func,
    removeTodo: PropTypes.func,
  }

  render() {
    const { todoList, addTodo, removeTodo } = this.props;

    return (
      <div>
        <AddTodo
          handleAddTodo={addTodo}
        />
        <TodoTable
          todos={todoList}
          handleRemoveTodo={removeTodo}
        />
      </div>
    );
  }
}
