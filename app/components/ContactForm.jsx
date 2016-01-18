import react, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyInput, SkyTextArea} from './sky';

export default React.createClass({

  render: function() {
    const user = this.props.user || {};
    const contact = this.props.contact || {};
    return (
      <formsy.Form onSubmit={this._handleSend} >
        <Row>
          <Col xs={12} className='form-group'>
            <label>Name</label>
            <SkyInput type='text' name='name' value={user.name} className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group'>
            <label>Email</label>
            <SkyInput type='text' name='email' value={user.email} className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group'>
            <label>What's on your mind?</label>
            <SkyTextArea name='message' value={contact.message} className='form-control' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='form-group'>
            <button className='btn btn-sky' type='submit'>Send</button>
          </Col>
        </Row>
      </formsy.Form>
    );
  },

});
