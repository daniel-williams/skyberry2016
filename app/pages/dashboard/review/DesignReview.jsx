import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';

export default React.createClass({
  displayName: 'DesignReview',

  show: function() {
    // return this.props.show;
    return true;
  },
  render: function() {
    return (
      <Modal id='review-modal' ref='modal' show={this.show()} backdrop='static'>
        <Modal.Header>
        <Row>
          <Col xs={12}>
            <h1>{this.props.review.title}</h1>
          </Col>
        </Row>
        </Modal.Header>
      </Modal>
    );
  },

});
