import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyCheckbox, SkyInput} from './';

export default React.createClass({

  render: function() {
    const identity = this.props.identity;
    const errors = {} && identity.lastRequestError && identity.lastRequestError.errors;

    return (
      <formsy.Form onSubmit={this.handleSignIn} validationErrors={errors}>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='text'
              name='username'
              placeholder='Username or Email'
              value={identity.username}
              required
              validationError='Username is required.'
              autoFocus />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='password'
              name='password'
              placeholder='Password'
              required
              validationError="Password is required." />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group'>
            <SkyButton
              type='submit'
              isPrimary
              size='lg'
              isDisabled={this.props.identity.isRequesting}>Sign In</SkyButton>
          </Col>
        </Row>
      </formsy.Form>
    );
  },

  handleSignIn(formData) {
    const {username, password} = formData;
    this.props.logOn(username, password);
  },

});
