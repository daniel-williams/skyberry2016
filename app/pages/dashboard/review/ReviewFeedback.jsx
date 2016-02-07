import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import ReviewShared from './ReviewShared';
import Directions from './directions';

import OptionNavigator from './OptionNavigator';
import OptionImage from './OptionImage';
import OptionComments from './OptionComments';
import OptionSelector from './OptionSelector';


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
  getReviewSlug: function() {
    return this.props.account.slug + '/' + this.props.project.slug + '/' + this.props.review.slug;
  },

  hasOptions: function() {
    return this.props.review.options && this.props.review.options.length > 0;
  },
  hasMultipleOptions: function() {
    return this.props.review.options && this.props.review.options.length > 1;
  },
  getOptionList: function() {
    return this.hasOptions()
      ? this.props.review.options.map(item => {
          return {
            id: item.id,
            title: item.title,
          };
        })
      : [];
  },
  getSelectedOption: function() {
    let option = {};
    let id = this.props.optionViewing || this.props.review.selectedId;
    if(!!id) {
      option = this.props.review.options.find(item => item.id === id)
    } else if(this.props.review.options && this.props.review.options.length) {
      option = this.props.review.options[0];
    }
    return option;
  },

  getComments: function(viewingId) {
    return this.props.review.comments.filter(item=>item.oId === viewingId);
  },

  getViewingId: function() {
    return this.props.optionViewing || this.props.review.selectedId || this.getSelectedOption().id;
  },
  isViewingSelected: function() {
    return !!this.props.review.selectedId &&
      this.getViewingId() === this.props.review.selectedId;
  },

  render: function() {
    return (
      <Modal id='review-feedback' ref='modal' show={this.props.showFeedback} backdrop='static'>
        <Modal.Header>
          <h1>Design Review<span className='accent'> for </span><span className='nowrap'>{this.getProjectName()}</span></h1>
          {this.renderClose()}
        </Modal.Header>
        {!!this.props.review && this.renderModalBody()}
        <Modal.Footer>
          {this.renderClose()}
        </Modal.Footer>
      </Modal>
    );
  },
  renderModalBody: function() {
    const selectedOption = this.getSelectedOption();
    const reviewSlug = this.getReviewSlug();
    const viewingId = this.getViewingId();
    const isViewingSelected = this.isViewingSelected();
    const showComments = this.props.showComments;

    return (
      <Modal.Body>

        <Directions {...this.props}/>

        <OptionNavigator
          items={this.getOptionList()}
          selectedId={this.props.review.selectedId}
          viewingId={viewingId}
          onClick={this.props.setOptionViewing} />

        {this.hasMultipleOptions() &&
          <OptionSelector
            isSelected={isViewingSelected}
            onSelectionClick={isViewingSelected
              ? () => this.props.clearOption(reviewSlug)
              : () => this.props.selectOption(reviewSlug, viewingId)}
            showComments={showComments}
            onCommentsClick={this.props.toggleComments} />
        }

        <Row className={'image-wrap mb' + (showComments ? ' open' : '')}>
          <Col xs={12}>
            <OptionImage option={selectedOption} />
            {showComments && <OptionComments items={this.getComments(viewingId)} />}
          </Col>
        </Row>

        <div className='mt-dbl'>
          <button type='button' className='btn btn-sky-primary' onClick={this.props.showApprovalForm}>Show Approval</button>
        </div>

      </Modal.Body>
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
