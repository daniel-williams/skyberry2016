import React, {PropTypes} from 'react';
import {Location} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default React.createClass({
  displayName: 'Nav',

  getInitialState: function() {
    return {
      expanded: false
    };
  },
  render: function () {
    return (
      <Navbar expanded={this.state.expanded} onToggle={this.handleToggle}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onClick={this.handleClick}>
            <LinkContainer to='/'><NavItem eventKey={1}>Home</NavItem></LinkContainer>
            <LinkContainer to='/about'><NavItem eventKey={2}>About</NavItem></LinkContainer>
            <LinkContainer to='/portfolio'><NavItem eventKey={3}>Portfolio</NavItem></LinkContainer>
            <LinkContainer to='/blog'><NavItem eventKey={4}>Blog</NavItem></LinkContainer>
            <LinkContainer to='/contact'><NavItem eventKey={5}>Contact</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  },

  handleClick: function(e) {
    let tgt = $(e.target).closest('li');
    if(!tgt.hasClass('dropdown')) {
      this.setState({ expanded: false });
    }
  },
  handleToggle: function() {
    this.setState({ expanded: !this.state.expanded });
  },

});
