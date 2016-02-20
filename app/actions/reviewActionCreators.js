import FetchService from '../services/FetchService';
import * as reviewActions from './reviewActions';


export function mergeIncomingReviews(reviews) {
  return {
    type: reviewActions.MERGE_INCOMING_REVIEWS,
    payload: {
      reviews: reviews,
    }
  };
}

export function reviewOptionSetSelected(slug, optionId) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return FetchService.getJson('/api/reviews/' + id + '/options/' + optionId, true)
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

    return FetchService.getJson('/api/reviews/' + id + '/options/clear', true)
      .then(() => {
        dispatch(optionCleared(slug));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function reviewOptionSetViewing(optionId) {
  return {
    type: reviewActions.REVIEW_OPTION_SET_VIEWING,
    payload: {
      optionId: optionId,
    }
  };
}

export function reviewRequestRevision(slug) {
  return function(dispatch, getState) {
    dispatch(updateReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return FetchService.getJson('/api/reviews/' + id + '/revision', true)
      .then((json) => {
        dispatch(requestRevision(slug, json.result));
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

    return FetchService.getJson('/api/reviews/' + id + '/deliverables', true)
      .then((json) => {
        dispatch(requestDeliverables(slug, json.result));
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

    return FetchService.getJson('/api/reviews/' + id + '/clear-request', true)
      .then(() => {
        dispatch(requestCleared(slug));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}

export function reviewStepToggled(key) {
  return {
    type: reviewActions.REVIEW_STEP_TOGGLED,
    payload: {
      key: key,
    }
  };
}
export function reviewCommmentsToggled() {
  return {
    type: reviewActions.REVIEW_COMMENTS_TOGGLED,
  };
}

export function reviewHideFeedback() {
  return {
    type: reviewActions.REVIEW_HIDE_FEEDBACK,
  };
}

export function reviewShowApproval() {
  return {
    type: reviewActions.REVIEW_SHOW_APPROVAL,
  };
}
export function reviewHideApproval() {
  return {
    type: reviewActions.REVIEW_HIDE_APPROVAL,
  };
}

export function reviewResetUi() {
  return {
    type: reviewActions.REVIEW_UI_RESET,
  };
}


export default {
  mergeIncomingReviews,

  reviewOptionSetSelected,
  reviewOptionClearSelected,
  reviewOptionSetViewing,

  reviewRequestRevision,
  reviewRequestDeliverables,
  reviewRequestCanceled,

  reviewStepToggled,
  reviewCommmentsToggled,

  reviewHideFeedback,
  reviewShowApproval,
  reviewHideApproval,

  reviewResetUi,
};



// internal helpers
function setSelected(slug, optionId) {
  return {
    type: reviewActions.REVIEW_OPTION_SET_SELECTED,
    payload: {
      slug: slug,
      optionId: optionId,
    }
  };
}
function optionCleared(slug) {
  return {
    type: reviewActions.REVIEW_OPTION_CLEAR_SELECTED,
    payload: {
      slug: slug,
    }
  };
}

function requestRevision(slug, result) {
  return {
    type: reviewActions.REVIEW_REQUEST_REVISION,
    payload: {
      slug: slug,
      result: result,
    }
  }
}
function requestDeliverables(slug, result) {
  return {
    type: reviewActions.REVIEW_REQUEST_DELIVERABLES,
    payload: {
      slug: slug,
      result: result,
    }
  }
}
function requestCleared(slug) {
  return {
    type: reviewActions.REVIEW_REQUEST_CANCELED,
    payload: {
      slug: slug,
    }
  }
}


function updateReview() {
  return {
    type: reviewActions.UPDATE_REVIEW,
  };
}
function updateReviewSuccess(slug, review) {
  return {
    type: reviewActions.UPDATE_REVIEW_SUCCESS,
    payload: {
      date: new Date(),
      slug: slug,
      review: review,
    },
  };
}
function updateReviewFailed(error) {
  return {
    type: reviewActions.UPDATE_REVIEW_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}
