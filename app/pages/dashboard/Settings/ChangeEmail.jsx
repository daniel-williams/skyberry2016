import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {ChangeEmailForm, SkyModal} from '../../../components';


export default React.createClass({
  displayName: 'ChangeEmail',

  mixins: [PureRender],

  propTypes: {
    show: PropTypes.bool,
    currentEmail: PropTypes.string,
    changeEmail: PropTypes.any,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      show: false,
      currentEmail: null,
      changeEmail: {},
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
          this.props.changeEmail.hasUpdated
            ? this.renderSuccess()
            : this.renderForm()
        }
        onClose={this.props.onClose}
        />
    );
  },
  renderHeader: function() {
    return <h1>Change Email</h1>;
  },

  renderSuccess: function() {
    return <div>Success!</div>
  },

  renderForm: function() {
    const changeEmail = this.props.changeEmail;

    return (
      <div className='form-wrap'>
        <div className='form-group'>
          <label>Current Email</label>
          <input disabled={true} className='form-control' value={this.props.currentEmail} />
        </div>
        <ChangeEmailForm
          isUpdating={changeEmail.isUpdating}
          formData={changeEmail.formData}
          formErrors={changeEmail.error && changeEmail.error.formErrors}
          onSubmit={this.props.onSubmit} />
      </div>
    );
  },

});
