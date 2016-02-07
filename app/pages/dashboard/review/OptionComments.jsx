import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import formsy from 'formsy-react';

import {SkyTextArea} from '../../../components';


export default React.createClass({
  displayName: 'OptionComments',

  mixins: [PureRender],

  propTypes: {
    items: PropTypes.array,
    hasRequest: PropTypes.bool,
    isAccepted: PropTypes.bool,
    isPosting: PropTypes.bool,
    onSubmit: PropTypes.func,
    error: PropTypes.object,
  },
  getDefaultProps: function() {
    return {
      items: [],
      hasRequest: false,
      isAccepted: false,
      isPosting: false,
      onSubmit: function() {},
      error: {},
    };
  },
  getFormErrors: function() {
    return this.props.error && this.props.error.formErrors;
  },

  render: function() {
    var isDisabled = this.props.hasRequest;
    var tip = this.props.isAccepted
      ? 'This Design Review is locked.'
      : this.props.hasRequest
        ? 'Request pending! Edits are not allowed.'
        : '';

    return (
      <div className='comment-wrap'>
      <formsy.Form onSubmit={this.props.onSubmit} validationErrors={this.getFormErrors()}>
        <Row style={{paddingLeft:'15px'}}>
          <Col xs={12}>
            <SkyTextArea
              name='comment'
              placeholder={'whatdaya think?'}
              value={null}
              required
              validationError="Comment is required."
              className='form-control'
              disabled={isDisabled} />
          </Col>
          <Col xs={12} className='mv-half right'>
            <button
              className='btn btn-sm btn-default'
              type='submit' disabled={isDisabled || this.props.isPosting} title={tip}>Add Comment</button>
          </Col>
          <Col xs={12}>
            <label>Comments</label>
          </Col>
          <Col xs={12}>
            {this.props.items.length
              ? this.renderComments()
              : this.renderNoComments()}
          </Col>
        </Row>
        </formsy.Form>
      </div>
    );
  },
  renderNoComments: function() {
    return (
      <div className='comment'>none yet...</div>
    );
  },
  renderComments: function() {
    return this.props.items.map(function(item, i) {
      return (
        <div key={i} className='comment'>
          <span className='byline'>{item.uName}:</span>
          {item.comment}
        </div>
      );
    });
  },

});
