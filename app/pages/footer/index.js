import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

import {IconButtonBar, ImageLoader} from '../../components';
import constants from '../../constants';
require('./footer.less');


export default React.createClass({
  displayName: 'Footer',

  render: function () {
    return (
      <section id='footer'>

        <div className='ttl'>
          <Grid fluid={false}>
            {this.renderFooterTitle()}
          </Grid>
        </div>
        <div className='columns'>
          <Grid fluid={false}>
            {this.renderColumns()}
          </Grid>
        </div>
        <div className='foot-nav'>
          <Grid fluid={false}>
            {this.renderFooterNav()}
          </Grid>
        </div>
        <div className='copyright'>
          <Grid fluid={false}>
            {this.renderCopyright()}
          </Grid>
        </div>
      </section>
    );
  },

  renderFooterTitle: function() {
    return (
      <Row>
        <Col xs={12}><h1>We Love Connecting with New People</h1></Col>
      </Row>
    );
  },
  renderColumns: function() {
    return (
      <Row className='mt'>
        <Col lg={4} sm={3} xs={12}>
          {this.renderLeftColumn()}
        </Col>
        <Col lg={4} sm={6} xs={12}>
          {this.renderCenterColumn()}
        </Col>
        <Col lg={4} sm={3} xs={12}>
          {this.renderRightColumn()}
        </Col>
      </Row>
    );
  },

  renderLeftColumn: function() {
    return (
      <div className='foot-col'>
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
  renderCenterColumn: function() {
    return (
      <div className='foot-col'>
        <h3>We're Social</h3>
        <div className='col-body'>
          <div>Connect with us on social media</div>
          <div>@SkyberryStudio</div>
          {this.renderSocialIcons()}
        </div>
      </div>
    );
  },
  renderRightColumn: function() {
    return (
      <div className='foot-col'>
        <h3>Our Studio</h3>
        <div className='col-body'>
          <div>Skyberry Studio is located in beautiful Bothell, just northeast of Seattle Washington, overlooking the wetland preserve at North Creek.</div>
        </div>
      </div>
    );
  },

  renderSocialIcons: function() {
    return (
      <div className='social-icons'>
        <IconButtonBar links={constants.links.skyberry} size={40} />
      </div>
    );
  },

  renderFooterNav: function() {
    return (
      <Row className='footer-nav'>
        <Col md={6} sm={2}>
          <span style={{display:'inline-block'}}>
            <ul className='nav hidden-sm' onClick={this.scrollTop}>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/portfolio'>Portfolio</Link></li>
              <li><Link to='/blog'>Blog</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </ul>
          </span>
        </Col>
        <Col md={6} sm={10}>
          <div className='right' style={{verticleAlign:'bottom'}}>
            <ImageLoader id='seattle-skyline' src='/content/images/seattle-skyline.png' className='img-responsive' />
          </div>
        </Col>
      </Row>
    );
  },

  renderCopyright: function() {
    let year = new Date().getFullYear();
    return (
      <Row>
        <Col xs={12} className='mv-half right'>
          <span>Copyright &copy; 2006-{year}. Skyberry Studio. All Rights Reserved.</span>
        </Col>
      </Row>
    );
  },

  scrollTop: function() {
    window && window.scrollTo(0,0);
  }
});
