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
            status={StepStatus.COMPLETED}
            open={this.props.steps.review}
            onClick={() => this.props.toggleStep('review')}

            hasProofs={this.hasProofs()} />
        </Col>
        <Col xs={12}>
          <LeaveFeedback
            status={StepStatus.COMPLETED}
            open={this.props.steps.feedback}
            onClick={() => this.props.toggleStep('feedback')}

            hasMultipleOptions={this.hasMultipleOptions()}
            selectedOption={this.getSelectedOption()}
            clearOption={() => this.hasSelectedOption() && this.props.clearOption(this.getReviewSlug())} />
        </Col>
      </Row>
    );
  },

});
