import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'OptionSelector',

  mixins: [PureRender],

  propTypes: {
    isSelected: PropTypes.bool,
    showComments: PropTypes.bool,
    isEditable: PropTypes.bool,
    isLegacyProject: PropTypes.bool,
    selectionClick: PropTypes.func,
    commentsClick: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      isSelected: false,
      showComments: false,
      isEditable: true,
      isLegacyProject: false,
      selectionClick: function() {},
      commentsClick: function() {},
    };
  },

  render: function() {
    return (
      <Row>
        <Col xs={12}>
          {!this.props.isLegacyProject && this.renderSelectionButton()}
          <button
            className='btn btn-sm btn-default mv-half'
            onClick={this.props.commentsClick}>{this.renderCommentText()}</button>
        </Col>
      </Row>
    );
  },
  renderSelectionButton: function() {
    const selectButtonCssNames = classnames('btn', 'mv-half', {
      'btn-default': this.props.isSelected || !this.props.isEditable,
      'btn-sky': !this.props.isSelected && this.props.isEditable,
      'disabled': !this.props.isEditable,
    });
    const selectButtonTip = this.props.isEditable
      ? 'Select this option.'
      : 'This design review is no longer editable.';

    return (
      <button
        className={selectButtonCssNames}
        disabled={!this.props.isEditable}
        title={selectButtonTip}
        onClick={this.props.selectionClick}>{this.renderSelectionText()}</button>
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
