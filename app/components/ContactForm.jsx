import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput, SkyTextArea} from './sky';

export default React.createClass({

  render: function() {
    const identity = this.props.identity.toJS() || {};
    const contact = this.props.contact.toJS() || {};
    const errors = contact.lastPostError && contact.lastPostError.errors || {}
    return (
      <formsy.Form onSubmit={this.props.handleSubmit} validationErrors={errors}>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='text'
              name='name'
              label='Name'
              value={identity.name}
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='text'
              name='email'
              label='Email'
              value={identity.email}
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
              value={contact.message}
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group'>
            <button className='btn btn-sky' type='submit' disabled={this.props.contact.get('isPosting')}>Send</button>
          </Col>
        </Row>
      </formsy.Form>
    );
  },

});
