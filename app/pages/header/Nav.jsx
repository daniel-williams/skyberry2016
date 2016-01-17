import React, {PropTypes} from 'react';
import {Location} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Brand from './Brand';
require('./index.less');


export default React.createClass({
  displayName: 'Nav',

  propTypes: {
    user: PropTypes.object,
  },
  getDefaultProps: function() {
    return {
      user: {},
    }
  },
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  inDash: function() {
    return this.props.location.pathname.indexOf('/dashboard/') >= 0 ? 'active' : '';
  },
  render: function () {
    let authenticated = this.props.user.authenticated;
    return (
      <Navbar expanded={this.state.expanded} onToggle={this.handleToggle}>
        <Navbar.Header>
          <Navbar.Brand>
            <Brand
              src="/content/images/logo.png"
              title='Skyberry Logo'
              id='sky-logo'
              className={this.state.inDashboard} />
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight onClick={this.handleClick}>
            <LinkContainer to='/'><NavItem eventKey={1}>Home</NavItem></LinkContainer>
            <LinkContainer to='/about'><NavItem eventKey={2}>About</NavItem></LinkContainer>
            <LinkContainer to='/portfolio'><NavItem eventKey={3}>Portfolio</NavItem></LinkContainer>
            <LinkContainer to='/blog'><NavItem eventKey={4}>Blog</NavItem></LinkContainer>
            <LinkContainer to='/contact'><NavItem eventKey={5}>Contact</NavItem></LinkContainer>
            {authenticated ? this.renderAuthenticatedDashboard() : this.renderPublicDashboard()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  },

    // renderBrand: function() {
    //     return (
    //         <Brand
    //             src="/content/images/logo.png"
    //             title='Skyberry Logo'
    //             id='sky-logo'
    //             className={this.state.inDashboard} />
    //     );
    // },
  renderPublicDashboard: function() {
    return (
      <NavDropdown eventKey={6} title="Dashboard" id='dashboard-ddl' className={this.inDash()}>
        <LinkContainer to='/dashboard/sign-in'><MenuItem eventKey={6.1}>Sign In</MenuItem></LinkContainer>
      </NavDropdown>
    );
  },
  renderAuthenticatedDashboard: function() {
    return (
      <NavDropdown eventKey={6} title="Dashboard" id='dashboard-ddl' className={this.inDash()}>
        <LinkContainer to='/dashboard/sign-out'><MenuItem eventKey={6.1}>Sign Out</MenuItem></LinkContainer>
        <MenuItem divider />
        <LinkContainer to='/dashboard/projects'><MenuItem eventKey={6.2}>Projects</MenuItem></LinkContainer>
        <LinkContainer to='/dashboard/billing'><MenuItem eventKey={6.3}>Billing</MenuItem></LinkContainer>
        <LinkContainer to='/dashboard/settings'><MenuItem eventKey={6.4}>Settings</MenuItem></LinkContainer>
      </NavDropdown>
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