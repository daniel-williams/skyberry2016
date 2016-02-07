import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'OptionSelector',

  mixins: [PureRender],

  propTypes: {
    isSelected: PropTypes.bool,
    onSelectionClick: PropTypes.func,
    showComments: PropTypes.bool,
    onCommentsClick: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      isSelected: false,
      onSelectionClick: function() {},
      showComments: false,
      onCommentsClick: function() {},
    };
  },

  render: function() {
    return (
      <Row className='mb-half'>
        <Col xs={12}>
          <button
            className='btn btn-primary'
            onClick={this.props.onSelectionClick}>{this.renderSelectionText()}</button>
          <button
            className='btn btn-default'
            onClick={this.props.onCommentsClick}>{this.renderCommentText()}</button>
        </Col>
      </Row>
    );
  },
  renderSelectionText: function() {
    return this.props.isSelected
      ? 'Unselect'
      : 'Select';
  },
  renderCommentText: function() {
    return this.props.showComments
      ? 'Hide Comments'
      : 'Show Comments';
  }

});
