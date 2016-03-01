import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyButton, SkyTextArea} from '../../../components';


export default React.createClass({
  displayName: 'OptionComments',

  mixins: [PureRender],

  propTypes: {
    items: PropTypes.array,
    isEditable: PropTypes.bool,
    isAccepted: PropTypes.bool,
    isPosting: PropTypes.bool,
    onSubmit: PropTypes.func,
    error: PropTypes.object,
  },
  getDefaultProps: function() {
    return {
      items: [],
      isEditable: true,
      isAccepted: false,
      isPosting: false,
      onSubmit: function() {},
      error: {},
    };
  },

  getComment: function() {
    const comment = null || this.props.comment;
    return comment;
  },
  getFormErrors: function() {
    return this.props.error && this.props.error.formErrors;
  },

  render: function() {
    return (
      <div className='wrap comments-wrap'>
        {this.props.isEditable && this.renderCommentForm()}
        <Row>
          <Col xs={12}>
            <h4 className='ttl'>Comments</h4>
          </Col>
          <Col xs={12}>
            {this.props.items.length
              ? this.renderComments()
              : this.renderNoComments()}
          </Col>
        </Row>
      </div>
    );
  },
  renderCommentForm: function() {
    const isDisabled = !this.props.isEditable;
    return (
      <Row>
        <formsy.Form onSubmit={this.props.onSubmit} validationErrors={this.getFormErrors()}>
          <Col xs={12}>
            <SkyTextArea
              name='comment'
              placeholder={'whatdaya think?'}
              value={this.getComment()}
              required
              validationError="Comment is required."
              className='form-control'
              disabled={isDisabled} />
          </Col>
          <Col xs={12}>
            <div className='form-group right'>
              <SkyButton
                type='submit'
                isDisabled={isDisabled || this.props.isPosting}>Add Comment</SkyButton>
            </div>
          </Col>
        </formsy.Form>
      </Row>
    );
  },
  renderNoComments: function() {
    const msg = this.props.isEditable
      ? 'none yet...'
      : 'no comments were left for this item...';
    return (
      <div className='comment'>{msg}</div>
    );
  },
  renderComments: function() {
    return this.props.items.map(function(item, i) {
      return (
        <div key={i} className='comment'>
          <span className='byline'>{item.uName}</span>
          {item.comment}
        </div>
      );
    });
  },

});
