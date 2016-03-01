import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import {SkyButton} from '../../../components';


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
          {!this.props.isLegacyProject && this.props.isEditable && this.renderSelectionButton()}
          <SkyButton
            className='mv-half'
            onClick={this.props.commentsClick}>{this.renderCommentText()}</SkyButton>
        </Col>
      </Row>
    );
  },
  renderSelectionButton: function() {
    const selectButtonTip = this.props.isEditable
      ? 'Select this option.'
      : 'This design review is no longer editable.';

    return (
      <SkyButton
        isPrimary={this.props.isEditable}
        isDisabled={!this.props.isEditable}
        className='mv-half'
        title={selectButtonTip}
        onClick={this.props.selectionClick}>{this.renderSelectionText()}</SkyButton>
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
