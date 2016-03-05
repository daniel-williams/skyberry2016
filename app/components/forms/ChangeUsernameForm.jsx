import React, {PropTypes} from 'react';
import formsy from 'formsy-react';

import {SkyButton, SkyInput} from './';


export default React.createClass({
  displayName: 'ChangeUsernameForm',

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
    const {newUsername, confirmUsername} = this.props.formData;

    return (
      <formsy.Form onSubmit={onSubmit} ref='form'>
        <SkyInput
          type='text'
          name='newUsername'
          label='New Username'
          value={newUsername}
          required
          validationError="Username is required."
          disabled={isUpdating}
          autoFocus />
        <SkyInput
          type='text'
          name='confirmUsername'
          label='Confirm Username'
          value={confirmUsername}
          validations='equalsField:newUsername'
          validationErrors={'Confirm Username and New Username must match.'}
          disabled={isUpdating} />
        <div className='form-group'>
          <SkyButton
            type='submit'
            isPrimary
            size='lg'
            isDisabled={isUpdating}>Change Username</SkyButton>
        </div>
      </formsy.Form>
    );
  },

});
