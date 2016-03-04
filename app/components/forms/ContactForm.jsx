import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyInput, SkyTextArea} from './';


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
      <formsy.Form onValidSubmit={this.props.postContact} ref='form'>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='text'
              name='name'
              label='Name'
              value={this.getName().trim()} />
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
              validations='isEmail'
              validationError='Email address is required.' />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyTextArea
              name='message'
              label={`What's on your mind?`}
              value={this.getMessage()}
              required
              validationError='Message is required.'
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group mt-half'>
            <SkyButton
              type='submit'
              isPrimary
              size='lg'
              isDisabled={this.isPosting()}>Send Message</SkyButton>
          </Col>
        </Row>
      </formsy.Form>
    );
  },

});
