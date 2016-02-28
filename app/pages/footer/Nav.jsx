import React, {PropTypes} from 'react';
import {Location} from 'react-router';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default React.createClass({
  displayName: 'Nav',

  render: function () {
    return (
      <ButtonToolbar>
        <DropdownButton bsSize='large' title={this.renderMenuIcon()} dropup id='foot-ddl-nav'>
          <LinkContainer to='/' onClick={this.scrollTop}><MenuItem eventKey={1}>Home</MenuItem></LinkContainer>
          <LinkContainer to='/about' onClick={this.scrollTop}><MenuItem eventKey={2}>About</MenuItem></LinkContainer>
          <LinkContainer to='/portfolio' onClick={this.scrollTop}><MenuItem eventKey={3}>Portfolio</MenuItem></LinkContainer>
          <LinkContainer to='/blog' onClick={this.scrollTop}><MenuItem eventKey={4}>Blog</MenuItem></LinkContainer>
          <LinkContainer to='/contact' onClick={this.scrollTop}><MenuItem eventKey={5}>Contact</MenuItem></LinkContainer>
        </DropdownButton>
      </ButtonToolbar>
    );
  },
  renderMenuIcon: function() {
    return (
      <div>
        <span className='sr-only'>Toggle navigation</span>
        <span className='icon-bar'></span>
        <span className='icon-bar'></span>
        <span className='icon-bar'></span>
      </div>
    );
  },

  scrollTop: function() {
    setTimeout(function() {
      window && window.scrollTo(0,0);
    }, 0);
  }

});
