import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyInput, SkyTextArea} from '../components';


export default React.createClass({
  displayName: 'ConsultationForm',

  render: function() {
    return (
      <formsy.form onValidSubmit={this.props.onSubmit}>
        <SkyInput
          name='email'
          required
          validations='isEmail'
          placeholder='Email Address' />
        <Col xs={12} className='form-group'>
          <SkyButton
            type='submit'
            size='lg'>Submit</SkyButton>
        </Col>
      </formsy.form>
    );
  },
});
