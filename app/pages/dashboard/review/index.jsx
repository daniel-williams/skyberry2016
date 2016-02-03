import React, {PropTypes} from 'react';
// import {grid, Row, Col} from 'react-bootstrap';

import ReviewFeedback from './ReviewFeedback';
import ReviewApproval from './ReviewApproval';


export default React.createClass({
  displayName: 'Review',

  // propTypes: {
  //   account: PropTypes.any,
  //   project: PropTypes.any,
  //   review: PropTypes.any,
  //   showComments: PropTypes.bool,
  //   showApproval: PropTypes.bool,
  // },
  // getDefaultProps: function() {
  //   return {
  //     account: {},
  //     project: {},
  //     review: {},
  //     showComments: false,
  //     showComments: false,
  //     showApproval: false,
  //   };
  // },

  render: function() {
    return (
      <div id='review-wrap'>
        <ReviewFeedback {...this.props} />
        <ReviewApproval {...this.props} />
      </div>
    );
  },

});
