import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/reviewActions';
import Review from '../pages/dashboard/review';


function mapStateToProps(state, ownProps) {
  const {aSlug, pSlug, rSlug} = ownProps.params;
  const accountSlug = aSlug;
  const projectSlug = aSlug + '/' + pSlug;
  const reviewSlug = projectSlug + '/' + rSlug;
  const showFeedback = state.getIn(['review', 'showFeedback']);
  const showApproval = state.getIn(['review', 'showApproval']);
  const showComments = state.getIn(['review', 'showComments']);
  const toggleComments = showComments ? actions.hideComments : actions.showComments;
  let account, project, review;
  try {
    account = state.getIn(['account', 'accountMap', accountSlug]).toJS();
    project = state.getIn(['project', 'projects', projectSlug]).toJS();
    review = state.getIn(['review', 'reviews', reviewSlug]).toJS();
  } catch(e) {}

  return {
    account: account,
    project: project,
    review: review,
    showFeedback: showFeedback,
    showApproval: showApproval,
    showComments: showComments,
    toggleComments: toggleComments,
  };
}

export default connect(mapStateToProps, actions)(Review);