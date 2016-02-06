import React, {PropTypes} from 'react';
// import {grid, Row, Col} from 'react-bootstrap';

import ReviewFeedback from './ReviewFeedback';
import ReviewApproval from './ReviewApproval';


export default React.createClass({
  displayName: 'Review',

  render: function() {
    return (
      <div id='review-wrap'>
        <ReviewFeedback {...this.props} />
        <ReviewApproval {...this.props} />
      </div>
    );
  },

});
