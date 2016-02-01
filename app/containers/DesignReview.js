import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/reviewActions';
import DesignReview from '../pages/dashboard/review/DesignReview';


function mapStateToProps(state, ownProps) {
  const {aSlug, pSlug, rSlug} = ownProps.params;
  const compositeSlug = aSlug + '/' + pSlug + '/' + rSlug;
  const review = state.getIn(['review', 'reviews', compositeSlug]).toJS();

  return {
    show: state.getIn(['review', 'isActive']),
    review: review,
  };
}

export default connect(mapStateToProps, actions)(DesignReview);
