import React, { Component, PropTypes } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import './Header.less';

export default class Header extends Component {
  static propTypes = {
    handleLogout: PropTypes.func,
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.handleLogout();
  }

  render() {
    return (
      <header className="header">
        <Navbar color="#000" toggleable>
          <NavbarBrand>WiTodo</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button type="button" color="primary" onClick={this.handleLogout}>Logout</Button>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    );
  }
}
