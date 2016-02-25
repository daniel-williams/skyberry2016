import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput} from '../../components';


export default React.createClass({
  dispayName: 'Settings',

  getFullName: function() {
    return this.props.user && [this.props.user.firstName || '', ' ', this.props.user.lastName || ''].join('').trim();
  },

  getUserName: function() {
    return this.props.user && this.props.user.username;
  },
  getName: function() {
    return this.getFullName() || this.getUserName;
  },
  getEmail: function() {
    return this.props.user && this.props.user.email || '';
  },

  render: function() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12}>
            <h1><span>Settings</span><span className='accent'> for </span><span className='nowrap'>{this.getName()}</span></h1>
          </Col>
          <Col xs={12}>
            {this.renderChangeEmail()}
          </Col>
          <Col xs={12}>
            {this.renderChangeUsername()}
          </Col>
          <Col xs={12}>
            {this.renderChangePassword()}
          </Col>
        </Row>
      </Grid>
    );
  },

  renderChangeEmail: function() {
    const isDisabled = this.props.settings.isEmailUpdating;
    return (
      <div className='email-wrap'>
        <div className='ttl'>
          <h3>Change Email</h3>
        </div>
        <div className='current'>{this.props.user.email || 'no email found...'}</div>
        <div className='form-wrap'>
          <formsy.Form onSubmit={this.props.settingsUpdateEmail}>
            <SkyInput
              type='text'
              name='email'
              label='Email'
              value={null}
              required
              validations='isEmail'
              validationError='Email address is required.'
              className='form-control'
              disabled={isDisabled} />
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-lg btn-default'
                disabled={isDisabled}>Change Email</button>
            </div>
          </formsy.Form>
        </div>
      </div>
    );
  },

  renderChangeUsername: function() {
    const isDisabled = this.props.settings.isUsernameUpdating;
    return (
      <div className='username-wrap'>
        <div className='ttl'>
          <h3>Change Username</h3>
        </div>
        <div className='current'>{this.props.user.username || 'no username found...'}</div>
        <div className='form-wrap'>
          <formsy.Form onSubmit={this.props.settingsUpdateUsername}>
            <SkyInput
              type='text'
              name='username'
              label='Username'
              value={null}
              required
              validationError='Username is required.'
              className='form-control'
              disabled={isDisabled} />
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-lg btn-default'
                disabled={isDisabled}>Change Username</button>
            </div>
          </formsy.Form>
        </div>
      </div>
    );
  },

  renderChangePassword: function() {
    const isDisabled = this.props.settings.isPasswordUpdating;
    return (
      <div className='password-wrap'>
        <div className='ttl'>
          <h3>Change Password</h3>
        </div>
        <div className='form-wrap'>
          <formsy.Form onSubmit={this.props.settingsUpdatePassword}>
            <SkyInput
              type='password'
              name='oldPassword'
              label='Current Password'
              value={this.props.settings.oldPassword}
              required
              validationError='Password is required.'
              className='form-control'
              disabled={isDisabled} />
            <SkyInput
              type='password'
              name='newPassword'
              label='New Password'
              value={this.props.settings.newPassword}
              required
              validationError='New password is required.'
              className='form-control'
              disabled={isDisabled} />
            <SkyInput
              type='password'
              name='confirmPassword'
              label='Confirm Password'
              value={this.props.settings.confirmPassword}
              required
              validations='equalsField:newPassword'
              validationErrors={{
                required: 'Confirm password is required.',
                equalsField: 'Confirm password and New Password must match.'
              }}
              className='form-control'
              disabled={isDisabled} />
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-lg btn-default'
                disabled={isDisabled}>Change Password</button>
            </div>
          </formsy.Form>
        </div>
      </div>
    );
  },

});
