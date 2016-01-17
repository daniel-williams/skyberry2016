import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import {IconButtonBar} from '../../components';

import constants from '../../constants';
require('./index.less');


export default React.createClass({
  displayName: 'Footer',

  propTypes: {
    user: PropTypes.object
  },
  getDefaultProps: function() {
    return {
      user: {}
    };
  },
  getInitialState: function() {
    return {};
  },

  render: function () {
    return (
      <section id='footer'>
        <Grid fluid={true} style={{borderTop:'1px solid #ccc'}}>
          {this.renderFooterTitle()}
          {this.renderColumns()}
          {this.renderFooterNav()}
          {this.renderCopyright()}
        </Grid>
      </section>
    );
  },

  renderFooterTitle: function() {
    return (
      <Row className='mt-trpl'>
        <Col xs={12} align='center'><h1>We Love Connecting with New People</h1></Col>
      </Row>
    );
  },
  renderColumns: function() {
    return (
      <Row className='mt'>
        <Col lg={2} sm={1} className='hidden-xs'></Col>
        <Col lg={2} sm={3} xs={12}>
          {this.renderFirstColumn()}
        </Col>
        <Col lg={4} sm={4} xs={12}>
          {this.renderSecondColumn()}
        </Col>
        <Col lg={2} sm={3} xs={12}>
          {this.renderThirdColumn()}
        </Col>
        <Col lg={2} sm={1} className='hidden-xs'></Col>
      </Row>
    );
  },

  renderFirstColumn: function() {
    return (
      <div className='footer-col'>
        <h3>Get In Touch</h3>
        <div className='col-body'>
          <div>Contact Skyberry directly.</div>
          <div className='contact-info'>
            <div className='phone'>+1 503 272 1022</div>
            <div className='email'><a href='mailto:contact@skyberrystudio.com'>contact@skyberrystudio.com</a></div>
          </div>
        </div>
      </div>
    );
  },
  renderSecondColumn: function() {
    return (
      <div className='footer-col'>
        <h3>We're Social</h3>
        <div className='col-body'>
          <div>Connect with us on social media</div>
          <div>@SkyberryStudio</div>
          {this.renderSocialIcons()}
        </div>
      </div>
    );
  },
  renderThirdColumn: function() {
    return (
      <div className='footer-col'>
        <h3>Our Studio</h3>
        <div className='col-body'>
          <div>Skyberry Studio is located in beautiful Bothell, just northeast of Seattle Washington overlooking the wetland preserve at North Creek.</div>
        </div>
      </div>
    );
  },

  renderSocialIcons: function() {
    return (
      <div className='social-icons'>
        <IconButtonBar links={constants.links.skyberry} size='48px' />
      </div>
    );
  },

  // TODO djw: active section should be maintained in Main and handed to Header & Footer via props
  renderFooterNav: function() {
    return (
      <Row className='footer-nav'>
        <Col xs={12} align='center'>
          <span style={{display:'inline-block'}}>
            <ul className='nav'>
              <li><a href='#/'>Home</a></li>
              <li><a href='#/about'>About</a></li>
              <li><a href='#/portfolio'>Portfolio</a></li>
              <li><a href='#/blog'>Blog</a></li>
              <li><a href='#/contact'>Contact</a></li>
            </ul>
          </span>
        </Col>
      </Row>
    );
  },

  renderCopyright: function() {
    let year = new Date().getFullYear();
    return (
      <Row className='copyright'>
        <Col xs={12}>
          <span>Copyright &copy; 2006-{year}. Skyberry Studio. All Rights Reserved.</span>
        </Col>
      </Row>
    );
  },

});
