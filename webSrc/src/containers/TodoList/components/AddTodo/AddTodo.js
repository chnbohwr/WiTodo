import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default class AddTodo extends Component {
  static propTypes = {
    handleAddTodo: PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  changeText = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    const { text } = this.state;
    const { handleAddTodo } = this.props;

    return (
      <Form inline>
        <FormGroup>
          <Input
            type="text"
            placeholder="Todo..."
            onChange={this.changeText}
            value={text}
          />
        </FormGroup>
        {' '}
        <Button type="button" color="primary" onClick={() => handleAddTodo(text)}>Add</Button>
      </Form>
    );
  }
}
