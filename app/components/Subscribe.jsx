import React from 'react';
import {toJS} from 'immutable';
import {Modal, Grid, Row, Col} from 'react-bootstrap';
import Formsy from 'formsy-react';

import {Icon, SkyButton, SkyInput} from '../components';

// FIX: subscribe email could be different than identity.email... we need to store this apart.
export default React.createClass({
  isActive: function() {
    return this.props.subscribe.isActive;
  },
  showSubscribe: function() {
    return this.props.subscribe.showSubscribe;
  },
  getButtonState: function() {
    return this.props.subscribe.isPosting ? 'disabled' : '';
  },
  render: function() {
    return (
      <Modal id='subscribe-modal' ref='modal' show={this.showSubscribe()} backdrop='static'>
        <Modal.Header>
          <Row>
            <Col xs={12}>
              <h3 className='modal-ttl'>Get the latest, directly to your inbox</h3>
              <a onClick={this.handleClose} className='modal-close-icon icon'><Icon name='sky-close' /></a>
            </Col>
            <Col xs={12}>
              <p>Receive news and stuff.</p>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          {this.isActive() ? this.renderForm()
                           : this.renderSuccess()}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col xs={12}>
              <p style={{fontStyle:'italic',textAlign:'left'}}>Skyberry considers your information private and will never share it will other parties.</p>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  },
  renderForm: function() {
    let btnState = this.getButtonState();
    return (
      <Formsy.Form onValidSubmit={this.props.postSubscribe}>
        <Row>
          <Col xs={12} className='mb'>
            <SkyInput name="email"
              value={this.props.email}
              required
              validations="isEmail"
              validationError="A valid email address is required."
              placeholder='Email Address'
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <div className='col mb-half'>
            <SkyButton
              isPrimary
              type='submit'>Subscribe Now</SkyButton>
          </div>
          <div className='col mb-half'>
            <SkyButton
              onClick={this.handleClose}>Maybe Later</SkyButton>
          </div>
        </Row>
      </Formsy.Form>
    );
  },
  renderSuccess: function() {
    return (
      <Row>
        <Col xs={12} className='mb'>
          <h3>Okeydoke!</h3>
          <p>You will occasionally receive news and announcements at <span className='b'>{this.props.subscribe.email}</span>. Thank you for your interest in Skyberry Studio. We love what we do and would be here without you!</p>
        </Col>
        <Col xs={12}>
          <SkyButton
            onClick={this.handleClose}>Close</SkyButton>
        </Col>
      </Row>
    );
  },

  handleClose: function(e) {
    e.preventDefault();
    this.props.hideSubscribe();
  },

});
