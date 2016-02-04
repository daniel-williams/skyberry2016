import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import ReviewShared from './ReviewShared';
import Directions from './directions';

export default React.createClass({
  displayName: 'ReviewFeedback',

  // shared by ReviewFeedback & ReviewApproval
  mixins: [ReviewShared],

  getProjectRoot: function() {
    let root = '/dashboard/projects';
    if(this.props.account && this.props.project) {
      root = root + '/' + this.props.account.slug + '/' + this.props.project.slug;
    }
    return root;
  },
  render: function() {
    return (
      <Modal id='review-feedback' ref='modal' show={this.props.showFeedback} backdrop='static'>
        <Modal.Header>
          <h1>Design Review<span className='accent'> for </span><span className='nowrap'>{this.getProjectName()}</span></h1>
          {this.renderClose()}
        </Modal.Header>
        <Modal.Body>
          <Directions {...this.props}/>
          <button type='button' className='btn btn-sky-primary' onClick={this.props.showApprovalForm}>Show Approval</button>
        </Modal.Body>
        <Modal.Footer>
          {this.renderClose()}
        </Modal.Footer>
      </Modal>
    );
  },

  // handlers
  close: function() {
    this.props.hideFeedback();
    const id = setTimeout(
      this.goBack,
      500
    );
  },
  goBack: function() {
    this.props.history.pushState(null, this.getProjectRoot());
  },

});
