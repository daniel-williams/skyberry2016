import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput, SkyTextArea} from './sky';


export default React.createClass({
  getName: function() {
    return (this.props.user.firstName || '') + ' ' + (this.props.user.lastName || '')
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
  getFormErrors: function() {
    return {} && this.props.contact.lastPostError && this.props.contact.lastPostError.formErrors;
  },
  render: function() {
    return (
      <formsy.Form onSubmit={this.props.handleSubmit} validationErrors={this.getFormErrors()}>
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
              validationError="A valid email address is required."
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyTextArea
              name='message'
              label={'What is on your mind?'}
              value={this.getMessage()}
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group'>
            <button className='btn btn-sky' type='submit' disabled={this.isPosting()}>Send</button>
          </Col>
        </Row>
      </formsy.Form>
    );
  },

});
