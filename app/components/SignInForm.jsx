import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput} from './sky';

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
              placeholder='UserName'
              value={identity.username}
              required
              validationError='Username is required.'
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='password'
              name='password'
              placeholder='Password'
              required
              validationError="Password is required."
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SkyInput
              type='checkbox'
              name='remember'
              label='Remember me'
              value={false}
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group'>
            <button className='btn btn-sky' type='submit' disabled={this.props.identity.isRequesting}>Sign In</button>
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
