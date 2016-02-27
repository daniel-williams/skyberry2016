import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput, SkyTextArea} from './sky';


export default React.createClass({
  displayName: 'ContactForm',

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.errors && nextProps.errors.formErrors) {
      this.refs.form.updateInputsWithError(nextProps.errors.formErrors);
    }
  },


  getName: function() {
    return this.props.contact.name || (this.props.user.firstName || '') + ' ' + (this.props.user.lastName || '')
  },
  getEmail: function() {
    return this.props.contact.email || this.props.user.email || '';
  },
  getMessage: function() {
    return this.props.contact.message;
  },
  isPosting: function() {
    return this.props.contact.isPosting;
  },



  render: function() {
    return (
      <formsy.Form onSubmit={this.props.postContact} ref='form'>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='text'
              name='name'
              label='Name'
              value={this.getName().trim()}
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='text'
              name='email'
              label='Email'
              value={this.getEmail()}
              required
              validations="isEmail"
              validationError="Email address is required."
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyTextArea
              name='message'
              label={'What is on your mind?'}
              value={this.getMessage()}
              required
              validationError="Message is required."
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group mt-half'>
            <button className='btn btn-lg btn-sky' type='submit' disabled={this.isPosting()}>Send Message</button>
          </Col>
        </Row>
      </formsy.Form>
    );
  },

});
