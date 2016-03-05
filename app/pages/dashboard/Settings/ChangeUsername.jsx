import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {ChangeUsernameForm, SkyModal} from '../../../components';


export default React.createClass({
  displayName: 'ChangeUsername',

  mixins: [PureRender],

  propTypes: {
    show: PropTypes.bool,
    currentUsername: PropTypes.string,
    changeUsername: PropTypes.any,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      show: false,
      currentUsername: null,
      changeUsername: {},
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
          this.props.changeUsername.hasUpdated
            ? this.renderSuccess()
            : this.renderForm()
        }
        onClose={this.props.onClose}
        />
    );
  },
  renderHeader: function() {
    return <h1>Change Username</h1>;
  },

  renderSuccess: function() {
    return <div>Success!</div>
  },

  renderForm: function() {
    const changeUsername = this.props.changeUsername;

    return (
      <div className='form-wrap'>
        <div className='form-group'>
          <label>Current Username</label>
          <input disabled={true} className='form-control' value={this.props.currentUsername} />
        </div>
        <ChangeUsernameForm
          isUpdating={changeUsername.isUpdating}
          formData={changeUsername.formData}
          formErrors={changeUsername.error && changeUsername.error.formErrors}
          onSubmit={this.props.onSubmit} />
      </div>
    );
  },


});
