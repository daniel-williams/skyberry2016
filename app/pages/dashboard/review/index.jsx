import React, {PropTypes} from 'react';
// import {grid, Row, Col} from 'react-bootstrap';

import ReviewFeedback from './ReviewFeedback';
import ReviewApproval from './ReviewApproval';


export default React.createClass({
  displayName: 'Review',

  hasReview: function() {
    return this.props.review !== null;
  },

  render: function() {
    const hasReview = this.hasReview();
    return (
      <div id='review-wrap'>
        {hasReview && this.props.showFeedback && <ReviewFeedback {...this.props} />}
        {hasReview && this.props.showApproval && <ReviewApproval {...this.props} />}
      </div>
    );
  },

});
