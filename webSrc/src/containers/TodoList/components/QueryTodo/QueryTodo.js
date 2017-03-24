import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default class QueryTodo extends Component {
  static propTypes = {
    handleQueryTodo: PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  changeText = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    const { text } = this.state;
    const { handleQueryTodo } = this.props;

    return (
      <Form inline>
        <FormGroup>
          <Input
            type="text"
            placeholder="Search..."
            value={text}
            onChange={this.changeText}
          />
        </FormGroup>
        {' '}
        <Button type="button" color="info" onClick={() => handleQueryTodo(text)}>Query</Button>
      </Form>
    );
  }
}
