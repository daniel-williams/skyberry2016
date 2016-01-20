import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
﻿import classnames from 'classnames';

require('./ModalBox.less');


export default React.createClass({
  displayName: 'ModalBox',

  propTypes: {
    headline: PropTypes.string,
    overlay: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      overlay: true,
    };
  },

  render: function() {
    var cssClasses = classnames({
      'modal-box': true,
      'overlay': this.props.overlay,
    });

    return (
      <Row>
        <Col lg={3} md={3} sm={2} xs={1}></Col>
        <Col lg={6} md={6} sm={8} xs={10}>
          <div className={cssClasses}>
            {this.renderHeadline()}
            {this.props.children}
          </div>
        </Col>
        <Col lg={3} md={3} sm={2} xs={1}></Col>
      </Row>
    );
  },

  renderHeadline: function() {
    return this.props.headline ? <h1>{this.props.headline}</h1>
                               : null;
  },

});
