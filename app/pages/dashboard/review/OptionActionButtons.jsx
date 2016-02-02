import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootsrap';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'OptionActionButtons',

  mixins: [PureRender],

  propTypes: {
    showComments: PropTypes.bool,
    showSelect: PropTypes.bool,
    hasRequested: PropTypes.bool,
    hasAccepted: PropTypes.bool,
    isSelected: PropTypes.bool,
    optionSelected: Proptypes.func,
    clearSelected: Proptypes.func,
    commentToggle: Proptypes.func,
  },
  getDefaultProps: function() {
    return {
      showComments: false,
      showSelect: false,
      hasRequested: false,
      hasAccepted: false,
      isSelected: false,
      optionSelected: function() {},
      clearSelected: function() {},
      commenttoggle: function() {},
    };
  },
  render: function() {
    return (
      <Row className='action-buttons'>
        <Col xs={12}>
          {this.props.isSelected ? this.renderClearButton() : this.renderSelectButton()}
          {this.renderCommentButton()}
        </Col>
      </Row>
    );
  },
  renderCommentButton: function() {
    return (
      <button
        className='btn btn-default'
        type='button'
        onClick={this.props.commentToggle}>{this.renderCommentLabel()}</button>
    );
  },
  renderCommentLabel: function() {
    return this.props.showComments
      ? 'Hide Comments'
      : 'Show Comments';
  },
  renderSelectButton: function() {
    return (
      <button
        className='btn btn-sky'
        type='button'
        onClick={this.props.optionSelected}
        data-key={this.state.oId}
        disabled={isDisabled}
        title={this.renderTip()}>Select Option</button>
    );
  },
  renderClearButton: function() {
    return (
      <button
        className='btn btn-default'
        type='button'
        onClick={this.props.clearSelected}
        disabled={this.props.hasRequest}
        title={this.renderTip()}>Unselect Option</button>
    );
  },
  renderTip: function() {
    return this.props.isAccepted
      ? 'This design review is locked.'
      : this.state.hasRequest
        ? 'Request pending! Edits are not allowed.'
        : '';
  },

});
