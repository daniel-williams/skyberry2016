import React, {PropTypes} from 'react';
import formsy from 'formsy-react';

import {SkyButton, SkyInput} from './';


export default React.createClass({
  displayName: 'ChangePasswordForm',

  propTypes: {
    isUpdating: PropTypes.bool,
    formData: PropTypes.any,
    formErrors: PropTypes.any,
    onSubmit: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      isUpdating: false,
      formData: {},
      formErrors: {},
      onSubmit: function() {},
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.refs.form.updateInputsWithError(nextProps.formErrors || {});
  },

  render: function() {
    const {onSubmit, isUpdating} = this.props;
    const {oldPass, newPass, confirmPass} = this.props.formData;

    return (
      <formsy.Form onValidSubmit={onSubmit} ref='form'>
        <SkyInput
          type='password'
          name='oldPass'
          label='Current Password'
          value={oldPass}
          required
          validationError='Password is required.'
          disabled={isUpdating}
          autoFocus />
        <SkyInput
          type='password'
          name='newPass'
          label='New Password'
          value={newPass}
          required
          validationError='New password is required.'
          disabled={isUpdating} />
        <SkyInput
          type='password'
          name='confirmPass'
          label='Confirm Password'
          value={confirmPass}
          validations='equalsField:newPass'
          validationErrors={'Confirm password and New Password must match.'}
          disabled={isUpdating} />
        <div className='form-group'>
          <SkyButton
            type='submit'
            isPrimary
            size='lg'
            isDisabled={isUpdating}>Change Password</SkyButton>
        </div>
      </formsy.Form>
    );
  },

});
