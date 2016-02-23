import React, {PropTypes} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import ReviewShared from './ReviewShared';
import Directions from './directions';
import OptionNavigator from './OptionNavigator';
import OptionImage from './OptionImage';
import OptionComments from './OptionComments';
import OptionSelector from './OptionSelector';
import Proofs from './Proofs';


export default React.createClass({
  displayName: 'ReviewFeedback',

  // shared by ReviewFeedback & ReviewApproval
  mixins: [ReviewShared],

  getInitialState: function() {
    return {
      showComments: false,
      viewingOptionId: null,
    };
  },

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
  getReviewTitle: function() {
    return this.props.review && this.props.review.title;
  },

  hasProofs: function() {
    return this.props.review.proofs && this.props.review.proofs.length > 0;
  },
  hasOptions: function() {
    return this.props.review.options && this.props.review.options.length > 0;
  },
  hasMultipleOptions: function() {
    return this.props.review.options && this.props.review.options.length > 1;
  },

  getProofs: function() {
    return this.props.review.proofs || [];
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
  getComments: function(viewingId) {
    return this.props.review.comments.filter(item=>item.oId === viewingId);
  },
  getViewingId: function() {
    return this.state.viewingOptionId || this.props.review.selectedId || this.getDefaultOptionId();
  },
  getDefaultOptionId: function() {
    let id = null;
    if(this.props.review.options && this.props.review.options.length) {
      id = this.props.review.options[0].id;
    }
    return id;
  },
  getViewingOption: function() {
    const viewingId = this.getViewingId();
    return this.props.review.options && this.props.review.options.find(item => item.id === viewingId) || {};
  },

  isViewingSelected: function() {
    return this.props.review.selectedId === this.getViewingId();
  },


  isApproved: function() {
    return this.props.review.approvedDate != null;
  },
  isAccepted: function() {
    return this.props.review.acceptedDate !== null;
  },
  isEditable: function() {
    return !(this.isAccepted() || this.isApproved());
  },
  isLegacyProject: function() {
    return (this.isAccepted() && this.props.review.approvedDate === null && this.props.review.requestDate === null);
  },

  render: function() {
    return (
      <Modal id='review-feedback' ref='modal' show={this.props.showFeedback} backdrop='static'>
        <Modal.Header>
          <Row>
            <div className='col'>
              <h1>Design Review<span className='accent'> for </span><span className='nowrap'>{this.getProjectName()}</span></h1>
              <h3>{this.getReviewTitle()}</h3>
            </div>
            {this.renderClose()}
          </Row>
        </Modal.Header>
        {!!this.props.review && this.renderModalBody()}
        <Modal.Footer>
          <Row>
            {this.renderClose()}
          </Row>
        </Modal.Footer>
      </Modal>
    );
  },
  renderModalBody: function() {
    const viewingOption = this.getViewingOption();
    const reviewSlug = this.getReviewSlug();
    const isViewingSelected = this.isViewingSelected();
    const showComments = this.state.showComments;
    const isEditable = this.isEditable();
    const isLegacyProject = this.isLegacyProject();

    return (
      <Modal.Body>

        <Directions
          isEditable={isEditable}
          isLegacyProject={isLegacyProject}
          {...this.props} />

        <OptionNavigator
          items={this.getOptionList()}
          selectedId={this.props.review.selectedId}
          viewingId={viewingOption.id}
          onClick={this.setViewingOptionId} />

        <OptionSelector
          isSelected={isViewingSelected}
          showComments={showComments}
          isEditable={isEditable}
          isLegacyProject={isLegacyProject}
          selectionClick={isViewingSelected
            ? () => this.props.reviewOptionClearSelected(reviewSlug)
            : () => this.props.reviewOptionSetSelected(reviewSlug, viewingOption.id)}
          commentsClick={this.toggleComments} />

        <Row className={'image-wrap mb-half' + (showComments ? ' open' : '')}>
          <Col xs={12}>
            <OptionImage option={viewingOption} />
            {showComments &&
              <OptionComments
                items={this.getComments(viewingOption.id)}
                isEditable={isEditable}
                isLegacyProject={isLegacyProject} />
            }
          </Col>
        </Row>

        {this.hasProofs() && <Proofs items={this.getProofs()} />}

      </Modal.Body>
    );
  },


  // handlers
  close: function() {
    this.props.reviewHideFeedback();
    const id = setTimeout(
      this.goBack,
      500
    );
  },
  goBack: function() {
    this.props.history.pushState(null, this.getProjectRoot());
  },

  toggleComments: function() {
    this.setState({
      showComments: !this.state.showComments,
    });
  },
  setViewingOptionId: function(id) {
    this.setState({
      viewingOptionId: id,
    });
  },

});
