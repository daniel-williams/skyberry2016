import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyInput} from './SkyInput';


export default React.createClass({
  displayName: 'SubscribeForm',

  propTypes: {
    onSubmit: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      onSubmit: function() {},
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.errors && nextProps.errors.formErrors) {
      this.refs.form.updateInputsWithError(nextProps.errors.formErrors);
    }
  },


  render: function() {
    return (
      <Formsy.Form onValidSubmit={this.props.onSubmit}>
        <Row>
          <Col xs={12} className='mb'>
            <SkyInput
              name="email"
              value={this.props.email}
              required
              validations="isEmail"
              validationError="A valid email address is required."
              placeholder='Email Address' />
          </Col>
        </Row>
        <Row>
          <div className='col mb-half'>
            <SkyButton
              isPrimary
              type='submit'>Subscribe Now</SkyButton>
          </div>
          <div className='col mb-half'>
            <SkyButton
              onClick={this.handleClose}>Maybe Later</SkyButton>
          </div>
        </Row>
      </Formsy.Form>
    );
  }
})
