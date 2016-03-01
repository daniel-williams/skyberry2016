import SkyberryFetch from '../services/SkyberryFetchService';
import * as actions from './reviewActions';


export function mergeIncomingReviews(reviews) {
  return {
    type: actions.MERGE_INCOMING_REVIEWS,
    payload: {
      reviews: reviews,
    }
  };
}

export function reviewOptionSetSelected(slug, optionId) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return SkyberryFetch.getJson('/api/reviews/' + id + '/options/' + optionId, true)
      .then(() => {
        dispatch(setSelected(slug, optionId));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function reviewOptionClearSelected(slug) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return SkyberryFetch.getJson('/api/reviews/' + id + '/options/clear', true)
      .then(() => {
        dispatch(clearSelected(slug));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function reviewOptionAddComment(slug, formData) {
  return function(dispatch, getState) {
    dispatch(postComment(formData));

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return SkyberryFetch.postJson('/api/reviews/' + id + '/comments', formData, true)
      .then((json) => dispatch(postCommentSuccess(slug, json)))
      .catch(error => dispatch(postCommentFailed(error)));
  }
}

export function reviewRequestRevision(slug) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return SkyberryFetch.getJson('/api/reviews/' + id + '/revision', true)
      .then((json) => {
        dispatch(requestRevision(slug, json));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function reviewRequestDeliverables(slug) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return SkyberryFetch.getJson('/api/reviews/' + id + '/deliverables', true)
      .then((json) => {
        dispatch(requestDeliverables(slug, json));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function reviewRequestCanceled(slug) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return SkyberryFetch.getJson('/api/reviews/' + id + '/clear-request', true)
      .then((json) => {
        dispatch(requestCanceled(slug, json));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}

export function reviewApproveProject(slug) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return SkyberryFetch.getJson('/api/reviews/' + id + '/approve-project', true)
      .then((json) => {
        dispatch(approveProject(slug, json));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}



export function reviewHideFeedback() {
  return {
    type: actions.REVIEW_HIDE_FEEDBACK,
  };
}

export function reviewShowApproval() {
  return {
    type: actions.REVIEW_SHOW_APPROVAL,
  };
}
export function reviewHideApproval() {
  return {
    type: actions.REVIEW_HIDE_APPROVAL,
  };
}

export function reviewResetUi() {
  return {
    type: actions.REVIEW_UI_RESET,
  };
}

export function resetReviews() {
  return {
    type: actions.RESET_REVIEWS,
  };
}


export default {
  mergeIncomingReviews,
  resetReviews,

  reviewOptionSetSelected,
  reviewOptionClearSelected,
  reviewOptionAddComment,

  reviewApproveProject,

  reviewRequestRevision,
  reviewRequestDeliverables,
  reviewRequestCanceled,

  // reviewStepToggled,
  // reviewCommmentsToggled,

  reviewHideFeedback,
  reviewShowApproval,
  reviewHideApproval,

  reviewResetUi,
};



// internal helpers
function setSelected(slug, optionId) {
  return {
    type: actions.REVIEW_OPTION_SET_SELECTED,
    payload: {
      slug: slug,
      optionId: optionId,
    }
  };
}
function clearSelected(slug) {
  return {
    type: actions.REVIEW_OPTION_CLEAR_SELECTED,
    payload: {
      slug: slug,
    }
  };
}
function postComment(formData) {
  return {
    type: actions.REVIEW_OPTION_POST_COMMENT,
    payload: {
      comment: formData.comment,
    }
  };
}
function postCommentSuccess(slug, comment) {
  return {
    type: actions.REVIEW_OPTION_POST_COMMENT_SUCCESS,
    payload: {
      date: new Date(),
      slug: slug,
      comment: comment,
    }
  };
}
function postCommentFailed(error) {
  return {
    type: actions.REVIEW_OPTION_POST_COMMENT_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}


function requestRevision(slug, result) {
  return {
    type: actions.REVIEW_REQUEST_REVISION,
    payload: {
      slug: slug,
      result: result,
    }
  }
}
function requestDeliverables(slug, result) {
  return {
    type: actions.REVIEW_REQUEST_DELIVERABLES,
    payload: {
      slug: slug,
      result: result,
    }
  }
}
function requestCanceled(slug, result) {
  return {
    type: actions.REVIEW_REQUEST_CANCELED,
    payload: {
      slug: slug,
      result: result,
    }
  }
}

function approveProject(slug, result) {
  return {
    type: actions.REVIEW_APPROVE_PROJECT,
    payload: {
      slug: slug,
      result: result,
    }
  }
}


function updateReview() {
  return {
    type: actions.UPDATE_REVIEW,
  };
}
function updateReviewSuccess(slug, review) {
  return {
    type: actions.UPDATE_REVIEW_SUCCESS,
    payload: {
      date: new Date(),
      slug: slug,
      review: review,
    },
  };
}
function updateReviewFailed(error) {
  return {
    type: actions.UPDATE_REVIEW_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}
