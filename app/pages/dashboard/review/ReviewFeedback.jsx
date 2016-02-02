import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import ReviewShared from './ReviewShared';


export default React.createClass({
  displayName: 'ReviewFeedback',

  // shared by ReviewFeedback & ReviewApproval
  mixins: [ReviewShared],

  render: function() {
    return (
      <Modal id='review-feedback' ref='modal' show={this.props.showFeedback} backdrop='static'>
        <Modal.Header>
          <h1>Design Review<span className='accent'> for </span><span className='nowrap'>{this.getProjectName()}</span></h1>
          {this.renderClose()}
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          {this.renderClose()}
        </Modal.Footer>
      </Modal>
    );
  },

  // handlers
  close: function() {
    this.props.closeFeedback();
  },

});
