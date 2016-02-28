import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col, Modal} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput} from '../../../components';


export default React.createClass({
  displayName: 'ChangePassword',

  mixins: [PureRender],

  propTypes: {
    isVisible: PropTypes.bool,
    isUpdating: PropTypes.bool,
    hasUpdated: PropTypes.bool,
    data: PropTypes.any,
    errors: PropTypes.any,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      isVisible: false,
      isUpdating: false,
      hasUpdated: false,
      data: {},
      errors: {},
      onSubmit: function() {},
      onClose: function() {},
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.errors && nextProps.errors.formErrors) {
      this.refs.form.updateInputsWithError(nextProps.errors.formErrors);
    }
  },

  render: function() {
    return (
      <Modal id='change-password' ref='modal' show={this.props.isVisible} backdrop='static'>
        <Modal.Header>
          <Row>
            <div className='col'>
              <h1>Change Password</h1>
            </div>
            {this.renderClose()}
          </Row>
        </Modal.Header>
        <Modal.Body>
          {this.props.hasUpdated
            ? this.renderSuccess()
            : this.renderForm()
          }
        </Modal.Body>
        <Modal.Footer>
          <Row>
            {this.renderClose()}
          </Row>
        </Modal.Footer>
      </Modal>
    );
  },
  renderSuccess: function() {
    return <div>Success!</div>
  },

  renderForm: function() {
    const isDisabled = this.props.isUpdating;
    return (
      <div className='form-wrap'>
        <formsy.Form onSubmit={this.props.onSubmit} ref='form'>
          <SkyInput
            type='password'
            name='oldPass'
            label='Current Password'
            value={this.props.data.oldPass}
            required
            validationError='Password is required.'
            className='form-control'
            disabled={isDisabled}
            autoFocus />
          <SkyInput
            type='password'
            name='newPass'
            label='New Password'
            value={this.props.data.newPass}
            required
            validationError='New password is required.'
            className='form-control'
            disabled={isDisabled} />
          <SkyInput
            type='password'
            name='confirmPass'
            label='Confirm Password'
            value={this.props.data.confirmPass}
            validations='equalsField:newPass'
            validationErrors={'Confirm password and New Password must match.'}
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
    );
  },

  renderClose: function() {
    return (
      <div className='col pull-right'>
        <button className='btn btn-default' onClick={this.props.onClose}>Close</button>
      </div>
    );
  },

});
