import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import StepStatus from './StepStatus';
import ReviewOptions from './ReviewOptions';
import LeaveFeedback from './LeaveFeedback';
import RevisionOrDeliverables from './RevisionOrDeliverables';
import ProjectApproval from './ProjectApproval';
import SkyberryAcceptance from './SkyberryAcceptance';

import './directions.less';

export default React.createClass({
  displayName: 'ReviewDirections',

  mixins: [PureRender, StepStatus],

  propTypes: {
    isEditable: PropTypes.bool,
    isLegacyProject: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      isEditable: true,
      isLegacyProject: false,
    };
  },

  hasProofs: function() {
    return this.props.review.proofs && this.props.review.proofs.length > 0;
  },
  hasMultipleOptions: function() {
    return this.props.review.options && this.props.review.options.length > 1;
  },
  hasSelectedOption: function() {
    return !!this.props.review.selectedId;
  },
  getSelectedOption: function() {
    return this.props.review.options.find(item => item.id === this.props.review.selectedId) || null;
  },
  getRefinementOption: function() {
    return this.hasMultipleOptions()
      ? null
      : this.props.review.options[0];
  },

  hasRequest: function() {
    return this.props.review.requestType > 0;
  },
  getRequestType: function() {
    return this.props.review.requestType;
  },

  isApproved: function() {
    return this.props.review.approvedDate != null;
  },
  isAccepted: function() {
    return this.props.review.acceptedDate !== null;
  },
  isRequestCancelable: function() {
    // return this.props.isEditable;
    const requestType = this.getRequestType();
    return ((requestType === 1 && !this.isAccepted()) || (requestType === 2 && !this.isApproved()));
  },


  // Determine Step Status
  getReviewStatus: function() {
    return StepStatus.COMPLETED;
  },
  getFeedbackStatus: function() {
    let status = StepStatus.TODO;
    if(this.hasMultipleOptions()) {
      status = this.hasSelectedOption()
        ? StepStatus.COMPLETED
        : StepStatus.CURRENT;
    } else {
      status = StepStatus.COMPLETED;
    }
    return status;
  },
  getRequestStatus: function() {
    let status = StepStatus.TODO;
    if(this.hasRequest()) {
      status = StepStatus.COMPLETED;
    } else if(!this.hasMultipleOptions() || (this.hasMultipleOptions() && this.hasSelectedOption())) {
      status = StepStatus.CURRENT;
    }
    return status;
  },
  getApprovalStatus: function() {
    let status = StepStatus.HIDDEN;
    const review = this.props.review;
    if(review.requestType === 2) {
      status = this.isApproved()
        ? StepStatus.COMPLETED
        : StepStatus.CURRENT;
    }
    return status;
  },
  getAcceptanceStatus: function() {
    let status = StepStatus.HIDDEN;
    const review = this.props.review;
    if(review.requestType === 1 || (review.requestType === 2 && this.isApproved())) {
      status = this.isAccepted()
        ? StepStatus.COMPLETED
        : StepStatus.CURRENT;
    }
    return status;
  },


  getReviewSlug: function() {
    return this.props.account.slug + '/' + this.props.project.slug + '/' + this.props.review.slug;
  },

  render: function() {
    return (
      <Row id='directions' className='mb'>
        <Col xs={12}>
          <h2 className='ttl'>Directions</h2>
        </Col>
        <Col xs={12}>
          <ReviewOptions
            status={this.getReviewStatus()}
            notes={this.props.review.description}
            hasMultipleOptions={this.hasMultipleOptions()}
            hasProofs={this.hasProofs()} />
        </Col>
        <Col xs={12}>
          <LeaveFeedback
            status={this.getFeedbackStatus()}
            isEditable={this.props.isEditable}
            hasMultipleOptions={this.hasMultipleOptions()}
            selectedOption={this.getSelectedOption()}
            refinementOption={this.getRefinementOption()}
            clearOption={() => this.hasSelectedOption() && this.props.reviewOptionClearSelected(this.getReviewSlug())} />
        </Col>
        {!this.props.isLegacyProject && this.renderRevisionOrDeliverables()}
        {this.renderProjectApproval()}
        {this.renderSkyberryAcceptance()}
      </Row>
    );
  },
  renderRevisionOrDeliverables: function() {
    return (
      <Col xs={12}>
        <RevisionOrDeliverables
          status={this.getRequestStatus()}
          hasRequest={this.hasRequest()}
          requestType={this.getRequestType()}
          isDisabled={this.hasMultipleOptions() && !this.hasSelectedOption()}
          isCancelable={this.isRequestCancelable()}
          requestRevision={()=>this.props.reviewRequestRevision(this.getReviewSlug())}
          requestDeliverables={()=>this.props.reviewRequestDeliverables(this.getReviewSlug())}
          clearRequest={()=>this.props.reviewRequestCanceled(this.getReviewSlug())}
          />
      </Col>
    );
  },
  renderProjectApproval: function() {
    if(this.getApprovalStatus() === StepStatus.HIDDEN) { return; }

    return (
      <Col xs={12}>
        <ProjectApproval
          status={this.getApprovalStatus()}

          isApproved={this.isApproved()}
          approvedByName={this.props.review.approvedByName}
          approvedDate={this.props.review.approvedDate}
          showApproval={this.props.reviewShowApproval}
          />
      </Col>
    );
  },
  renderSkyberryAcceptance: function() {
    if(this.getAcceptanceStatus() === StepStatus.HIDDEN) { return; }

    return (
      <Col xs={12}>
        <SkyberryAcceptance
          status={this.getAcceptanceStatus()}
          requestType={this.props.review.requestType}
          />
      </Col>
    );
  },

});
