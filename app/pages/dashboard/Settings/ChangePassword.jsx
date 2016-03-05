import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {ChangePasswordForm, SkyModal} from '../../../components';


export default React.createClass({
  displayName: 'ChangePassword',

  mixins: [PureRender],

  propTypes: {
    show: PropTypes.bool,
    changePassword: PropTypes.any,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      isVisible: false,
      changePassword: {},
      onSubmit: function() {},
      onReset: function() {},
      onClose: function() {},
    };
  },

  render: function() {
    return (
      <SkyModal
        show={this.props.show}
        header={this.renderHeader()}
        body={
          this.props.changePassword.hasUpdated
            ? this.renderSuccess()
            : this.renderForm()
        }
        onClose={this.props.onClose}
        />
    );
  },
  renderHeader: function() {
    return <h1>Change Password</h1>;
  },
  renderSuccess: function() {
    return <div>Success!</div>
  },

  renderForm: function() {
    const changePassword = this.props.changePassword;

    return (
      <div className='form-wrap'>
        <ChangePasswordForm
          isUpdating={changePassword.isUpdating}
          formData={changePassword.formData}
          formErrors={changePassword.error && changePassword.error.formErrors}
          onSubmit={this.props.onSubmit} />
      </div>
    );
  },

});
