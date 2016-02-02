import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/reviewActions';
import DesignReview from '../pages/dashboard/review/DesignReview';


function mapStateToProps(state, ownProps) {
  const {aSlug, pSlug, rSlug} = ownProps.params;
  const projectSlug = aSlug + '/' + pSlug;
  const reviewSlug = projectSlug + '/' + rSlug;
  const showComments = state.getIn(['review', 'showComments']);
  const toggleReviewComments = showComments ? actions.hideReviewComments : actions.showReviewComments;
  let project, review;
  try {
    project = state.getIn(['project', 'projects', projectSlug]).toJS();
    review = state.getIn(['review', 'reviews', reviewSlug]).toJS();
  } catch(e) {}

  return {
    accountSlug: aSlug,
    showComments: showComments,
    project: project,
    review: review,
    toggleReviewComments: toggleReviewComments,
  };
}

export default connect(mapStateToProps, actions)(DesignReview);
