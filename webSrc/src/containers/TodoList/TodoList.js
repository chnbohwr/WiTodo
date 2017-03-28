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
    todoList: PropTypes.arrayOf(PropTypes.object),
    getTodo: PropTypes.func,
    addTodo: PropTypes.func,
    editTodo: PropTypes.func,
    removeTodo: PropTypes.func,
    changeEditStatus: PropTypes.func,
    changeEditText: PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    const { getTodo } = this.props;
    getTodo();
  }

  queryTodo = (query) => {
    this.setState({
      query
    });
  }

  render() {
    const { query } = this.state;
    const { todoList, addTodo, editTodo, removeTodo, changeEditStatus, changeEditText } = this.props;

    return (
      <div>
        <QueryTodo
          handleQueryTodo={this.queryTodo}
        />
        <AddTodo
          handleAddTodo={addTodo}
        />
        <TodoTable
          todos={todoList.filter(todo => todo.todo.indexOf(query) !== -1)}
          handleEditTodo={editTodo}
          handleChangeEditStatus={changeEditStatus}
          handleChangeEditText={changeEditText}
          handleRemoveTodo={removeTodo}
        />
      </div>
    );
  }
}
