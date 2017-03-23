import React, { Component, PropTypes } from 'react';
import { Table, Button } from 'reactstrap';

export default class TodoTable extends Component {
  static propTypes = {
    todos: PropTypes.shape,
    handleRemoveTodo: PropTypes.func,
  }

  render() {
    const { todos, handleRemoveTodo } = this.props;

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
            <tr key={`todo_${idx}`}>
              <td className="text-center">
                {idx + 1}
              </td>
              <td>
                {todo.text}
              </td>
              <td className="text-center">
                <Button type="button" color="warning">Edit</Button>
                {' '}
                <Button type="button" color="danger" onClick={() => handleRemoveTodo(todo.id)}>Remove</Button>
              </td>
            </tr>)
          )}
        </tbody>
      </Table>
    );
  }
}
