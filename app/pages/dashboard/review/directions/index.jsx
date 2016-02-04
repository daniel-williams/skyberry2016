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
    return this.props.review.proofs && this.props.review.proofs.length;
  },
  render: function() {
    return (
      <Row id='directions'>
        <Col xs={12}>
          <h2>Directions</h2>
        </Col>
        <Col xs={12}>
          <ReviewOptions status={StepStatus.COMPLETED} hasProofs={this.hasProofs()} open={false} />
        </Col>
      </Row>
    );
  },

});
