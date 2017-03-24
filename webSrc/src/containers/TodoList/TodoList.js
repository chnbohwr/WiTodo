import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { todoListActions } from 'redux_flow/actions/';

import QueryTodo from './components/QueryTodo';
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
    editTodo: PropTypes.func,
    removeTodo: PropTypes.func,
    changeEditStatus: PropTypes.func,
    changeEditText: PropTypes.func,
    queryTodo: PropTypes.func,
  }

  render() {
    const { todoList, addTodo, editTodo, removeTodo, changeEditStatus, changeEditText, queryTodo } = this.props;

    return (
      <div>
        <QueryTodo
          handleQueryTodo={queryTodo}
        />
        <AddTodo
          handleAddTodo={addTodo}
        />
        <TodoTable
          todos={todoList}
          handleEditTodo={editTodo}
          handleChangeEditStatus={changeEditStatus}
          handleChangeEditText={changeEditText}
          handleRemoveTodo={removeTodo}
        />
      </div>
    );
  }
}
