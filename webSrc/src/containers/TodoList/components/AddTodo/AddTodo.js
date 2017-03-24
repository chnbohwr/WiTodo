import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import fetch from 'isomorphic-fetch';

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

  addTodo = (text) => {
    const { handleAddTodo } = this.props;
    handleAddTodo({ id: new Date().getTime(), text, isEdit: false, editText: '', });

    this.setState({
      text: '',
    });
  }

  changeText = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    const { text } = this.state;

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
        <Button type="button" color="primary" onClick={() => this.addTodo(text)}>Add</Button>
      </Form>
    );
  }
}
