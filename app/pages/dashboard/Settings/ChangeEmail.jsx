import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col, Modal} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyInput} from '../../../components';


export default React.createClass({
  displayName: 'ChangeEmail',

  mixins: [PureRender],

  propTypes: {
    isVisible: PropTypes.bool,
    isUpdating: PropTypes.bool,
    hasUpdated: PropTypes.bool,
    current: PropTypes.string,
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
      current: null,
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
      <Modal id='change-email' ref='modal' show={this.props.isVisible} backdrop='static'>
        <Modal.Header>
          <Row>
            <div className='col'>
              <h1>Change Email</h1>
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
        <div className='form-group'>
          <label>Current Email</label>
          <input disabled={true} className='form-control' value={this.props.current} />
        </div>
        <formsy.Form onSubmit={this.props.onSubmit} ref='form'>
          <SkyInput
            type='text'
            name='newEmail'
            label='New Email'
            value={this.props.data.newEmail}
            required
            validations="isEmail"
            validationError="Email is required."
            disabled={isDisabled}
            autoFocus />
          <SkyInput
            type='text'
            name='confirmEmail'
            label='Confirm Email'
            value={this.props.data.confirmEmail}
            validations='equalsField:newEmail'
            validationErrors={'Confirm Email and New Email must match.'}
            disabled={isDisabled} />
          <div className='form-group'>
            <SkyButton
              type='submit'
              isPrimary
              size='lg'
              isDisabled={isDisabled}>Change Email</SkyButton>
          </div>
        </formsy.Form>
      </div>
    );
  },

  renderClose: function() {
    return (
      <div className='col pull-right'>
        <SkyButton
          onClick={this.props.onClose}>Close</SkyButton>
      </div>
    );
  },

});
