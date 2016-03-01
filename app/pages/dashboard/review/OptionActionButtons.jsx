import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootsrap';
import classnames from 'classnames';

import {SkyButton} from '../../../components';


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
      <SkyButton
        onClick={this.props.commentToggle}>{this.renderCommentLabel()}</SkyButton>
    );
  },
  renderCommentLabel: function() {
    return this.props.showComments
      ? 'Hide Comments'
      : 'Show Comments';
  },
  renderSelectButton: function() {
    return (
      <SkyButton
        isPrimary
        onClick={this.props.optionSelected}
        data-key={this.state.oId}
        title={this.renderTip()}>Select Option</SkyButton>
    );
  },
  renderClearButton: function() {
    return (
      <SkyButton
        onClick={this.props.clearSelected}
        title={this.renderTip()}>Unselect Option</SkyButton>
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
