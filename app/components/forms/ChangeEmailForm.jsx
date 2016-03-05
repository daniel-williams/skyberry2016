import React, {PropTypes} from 'react';
import formsy from 'formsy-react';

import {SkyButton, SkyInput} from './';


export default React.createClass({
  displayName: 'ChangeEmailForm',

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
    const {newEmail, confirmEmail} = this.props.formData;

    return (
      <formsy.Form onSubmit={onSubmit} ref='form'>
        <SkyInput
          type='text'
          name='newEmail'
          label='New Email'
          value={newEmail}
          required
          validations="isEmail"
          validationError="Email is required."
          disabled={isUpdating}
          autoFocus />
        <SkyInput
          type='text'
          name='confirmEmail'
          label='Confirm Email'
          value={confirmEmail}
          validations='equalsField:newEmail'
          validationErrors={'Confirm Email and New Email must match.'}
          disabled={isUpdating} />
        <div className='form-group'>
          <SkyButton
            type='submit'
            isPrimary
            isDisabled={isUpdating}
            size='lg'>Change Email</SkyButton>
        </div>
      </formsy.Form>
    );
  },

});
