import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyCheckbox, SkyInput} from './';

export default React.createClass({
  displayName: 'SignInForm',

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
    const {username, password} = this.props.formData;

    return (
      <formsy.Form onValidSubmit={onSubmit} ref='form'>
        <SkyInput
          type='text'
          name='username'
          placeholder='Username or Email'
          value={username}
          required
          validationError='Username is required.'
          disabled={isUpdating}
          autoFocus />
        <SkyInput
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          required
          validationError="Password is required."
          disabled={isUpdating} />
        {}
        <div className='form-group'>
          <SkyButton
            type='submit'
            isPrimary
            size='lg'
            isDisabled={isUpdating}>Sign In</SkyButton>
        </div>
      </formsy.Form>
    );
  },

});
