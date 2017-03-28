import React, { Component, PropTypes } from 'react';
import { Table, Button, Input } from 'reactstrap';

export default class TodoTable extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    handleEditTodo: PropTypes.func,
    handleRemoveTodo: PropTypes.func,
    handleChangeEditStatus: PropTypes.func,
    handleChangeEditText: PropTypes.func,
  }

  changeToEditTodo = (idx) => {
    console.log(idx);
    this.setState({

    });
  }

  render() {
    const { todos, handleRemoveTodo, handleChangeEditStatus, handleChangeEditText, handleEditTodo } = this.props;

    return (
      <Table bordered>
        <thead>
          <tr>
            <th className="text-center" style={{width: '100px'}}>No.</th>
            <th className="text-center">Todo</th>
            <th className="text-center" style={{width: '200px'}} />
          </tr>
        </thead>
        <tbody>
          { todos.map((todo, idx) => (
            <tr key={`todo_${todo.todoId}`}>
              <td className="text-center">
                {idx + 1}
              </td>
              {
                todo.isEdit
                ? (<td>
                  <Input
                    type="text"
                    onChange={e => handleChangeEditText({index: idx, text: e.target.value})}
                    value={todo.editText}
                  />
                </td>)
                : <td>{todo.todo}</td>
              }
              {
                todo.isEdit
                ? (<td className="text-center">
                  <Button type="button" color="success" onClick={() => handleEditTodo(idx)}>OK</Button>
                  {' '}
                  <Button type="button" color="danger" onClick={() => handleChangeEditStatus(idx)}>X</Button>
                </td>)
                : (<td className="text-center">
                  <Button type="button" color="warning" onClick={() => handleChangeEditStatus(idx)}>Edit</Button>
                  {' '}
                  <Button type="button" color="danger" onClick={() => handleRemoveTodo(todo.todoId)}>Remove</Button>
                </td>)
              }
            </tr>)
          )}
        </tbody>
      </Table>
    );
  }
}
