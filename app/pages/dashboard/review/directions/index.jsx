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
    let option = null;
    let id = this.props.review.selectedId;
    if(id) {
      option = this.props.review.options.find(item=>item.id === id);
    }
    return option;
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
    } else if(this.hasRequest()) {
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
    return StepStatus.COMPLETED;
  },
  getAcceptanceStatus: function() {
    return StepStatus.COMPLETED;
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
            open={this.props.steps.review}
            stepClick={() => this.props.reviewStepToggled('review')}

            hasProofs={this.hasProofs()} />
        </Col>
        <Col xs={12}>
          <LeaveFeedback
            status={this.getFeedbackStatus()}
            open={this.props.steps.feedback}
            stepClick={() => this.props.reviewStepToggled('feedback')}

            hasMultipleOptions={this.hasMultipleOptions()}
            selectedOption={this.getSelectedOption()}
            clearOption={() => this.hasSelectedOption() && this.props.reviewOptionClearSelected(this.getReviewSlug())} />
        </Col>
        <Col xs={12}>
          <RevisionOrDeliverables
            status={this.getRequestStatus()}
            open={this.props.steps.request}
            stepClick={() => this.props.reviewStepToggled('request')}

            hasRequest={this.hasRequest()}
            requestType={this.getRequestType()}
            isDisabled={this.hasMultipleOptions() && !this.hasSelectedOption()}
            isCancelable={this.isRequestCancelable()}
            requestRevision={()=>this.props.reviewRequestRevision(this.getReviewSlug())}
            requestDeliverables={()=>this.props.reviewRequestDeliverables(this.getReviewSlug())}
            clearRequest={()=>this.props.reviewRequestCanceled(this.getReviewSlug())}
            />
        </Col>
      </Row>
    );
  },

});
