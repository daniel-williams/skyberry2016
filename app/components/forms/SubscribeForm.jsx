import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyInput} from './';


export default React.createClass({
  displayName: 'SubscribeForm',

  propTypes: {
    isUpdating: PropTypes.bool,
    formData: PropTypes.any,
    formErrors: PropTypes.any,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      isUpdating: false,
      formData: {},
      formErrors: {},
      onSubmit: function() {},
      onClose: function() {},
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.refs.form.updateInputsWithError(nextProps.formErrors || {});
  },
  render: function() {
    const {onSubmit, isUpdating} = this.props;
    const {email} = this.props.formData;

    return (
      <formsy.Form onValidSubmit={onSubmit} ref='form'>
        <SkyInput
          name="email"
          value={email}
          required
          validations="isEmail"
          validationError="A valid email address is required."
          placeholder='Email Address'
          isDisabled={isUpdating} />
        <div>
          <SkyButton
            type='submit'
            isPrimary
            isDisabled={isUpdating}
            className='mb-half'>Subscribe Now</SkyButton>
          <SkyButton
            isDisabled={isUpdating}
            onClick={this.props.onClose}
            className='ml mb-half'>Maybe Later</SkyButton>
        </div>
      </formsy.Form>
    );
  },
  // render: function() {
  //   const {onSubmit, isUpdating} = this.props;
  //   const {email} = this.props.formData;
  //
  //   return (
  //     <formsy.Form onValidSubmit={onSubmit}>
  //       <SkyInput
  //         name="email"
  //         value={email}
  //         required
  //         validations="isEmail"
  //         validationError="A valid email address is required."
  //         placeholder='Email Address'
  //         isDisabled={isUpdating} />
  //       <div className='form-group'>
  //         <SkyButton
  //           type='submit'
  //           isPrimary
  //           isDisabled={isUpdating}
  //           className='mb-half'>Subscribe Now</SkyButton>
  //         <SkyButton
  //           isDisabled={isUpdating}
  //           onClick={this.props.onClose}
  //           className='mb-half'>Maybe Later</SkyButton>
  //       </div>
  //     </formsy.Form>
  //   );
  // },

});
