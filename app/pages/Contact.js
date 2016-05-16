import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

import constants from '../constants';
import {ContactForm, CoverBillboard, IconButtonBar, ModalBox} from '../components';

import './Contact.less';

export default React.createClass({
  hasPosted: function() {
    return this.props.contact.hasPosted;
  },
  render: function () {
    return (
      <div id='contact'>
        <Helmet
          title='Contact Skyberry Studio'
          meta={[{
            'name': 'description',
            'content': 'Skyberry is an award winning print, graphic and web design studio located in Bothell Washington.'
          }]}
        />
        <CoverBillboard imgSrc={constants.routes.images + 'jumbo2.jpg'} overlayOpacity={30}>
          <ModalBox headline='Give Us a Shout'>
            <div>
              <div className='center'>+1 503 272 1022</div>
              <div className='center mb'><a href='mailto:contact@skyberrystudio.com'>contact@skyberrystudio.com</a></div>
              <IconButtonBar links={constants.links.skyberry} size={40} />
            </div>
          </ModalBox>
        </CoverBillboard>
        <Grid fluid={false}>
          <Row className='mt-trpl'>
            <Col xs={12} className='center'>
              <h1>We'd Love to Hear From You</h1>
            </Col>
          </Row>
          <Row className='mt'>
            <Col  md={3} sm={2} className='hidden-xs' />
            <Col  md={6} sm={8}>
              {this.hasPosted() ? this.renderThankYou()
                                : this.renderContactForm()}
            </Col>
            <Col  md={3} sm={2} className='hidden-xs' />
          </Row>
        </Grid>
      </div>
    );
  },

  renderContactForm: function() {
    return <ContactForm {...this.props} />
  },
  renderThankYou: function() {
    return (
      <Row>
        <Col xs={12}>
          <h3>Super Fantastic!</h3>
          <p>We've received your message. If appropriate, we'll get back to you at {this.props.contact.email}, soon. To ensure delivery, please add <a href='mailto:contact@skyberrystudio.com'>contact@skyberrystudio.com</a> to your address book or email whitelist.</p>
          <p>Thank you for your interest in Skyberry Studio. We love what we do and wouldn't be here without you!</p>
          <div className='mt'>Have <a href='javascript:void(0)' onClick={this.props.resetContact}>more to say</a>?</div>
        </Col>
      </Row>
    );
  }


});
