export const REVIEW_ADD_REVIEWS = 'REVIEW_ADD_REVIEWS';

export const REVIEW_RESET_UI = 'REVIEW_RESET_UI';

export const REVIEW_STEP_TOGGLE = 'REVIEW_STEP_TOGGLE';

export const REVIEW_COMMENTS_SHOW = 'REVIEW_COMMENTS_SHOW';
export const REVIEW_COMMENTS_HIDE = 'REVIEW_COMMENTS_HIDE';

export const REVIEW_FEEDBACK_SHOW = 'REVIEW_FEEDBACK_SHOW';
export const REVIEW_FEEDBACK_HIDE = 'REVIEW_FEEDBACK_HIDE';

export const REVIEW_APPROVAL_SHOW = 'REVIEW_APPROVAL_SHOW';
export const REVIEW_APPROVAL_HIDE = 'REVIEW_APPROVAL_HIDE';
export const REVIEW_APPROVE_PROJECT = 'REVIEW_APPROVE_PROJECT';

export const REVIEW_UPDATING = 'REVIEW_UPDATING';
export const REVIEW_UPDATE_SUCCESS = 'REVIEW_UPDATE_SUCCESS';
export const REVIEW_UPDATE_FAILED = 'REVIEW_UPDATE_FAILED';

export const REVIEW_OPTION_VIEWING = 'REVIEW_OPTION_VIEWING';
export const REVIEW_OPTION_SELECTED = 'REVIEW_OPTION_SELECTED';
export const REVIEW_OPTION_CLEARED = 'REVIEW_OPTION_CLEARED';
export const REVIEW_OPTION_ADD_COMMENT = 'REVIEW_OPTION_ADD_COMMENT';

export const REVIEW_REQUEST_REVISION = 'REVIEW_REQUEST_REVISION';
export const REVIEW_REQUEST_DELIVERABLES = 'REVIEW_REQUEST_DELIVERABLES';
export const REVIEW_REQUEST_CLEAR = 'REVIEW_REQUEST_CLEAR';


export function addReviews(compositeSlug, reviews) {
  return {
    type: REVIEW_ADD_REVIEWS,
    payload: {
      compositeSlug: compositeSlug,
      reviews: reviews,
    }
  };
}

export function resetReview() {
  return {
    type: REVIEW_RESET_UI,
  };
}

export function toggleStep(key) {
  return {
    type: REVIEW_STEP_TOGGLE,
    payload: {
      key: key,
    }
  };
}

export function showComments() {
  return {
    type: REVIEW_COMMENTS_SHOW,
  };
}
export function hideComments() {
  return {
    type: REVIEW_COMMENTS_HIDE,
  };
}
export function addOptionComment(reviewId, optionId, comment) {
  return {
    type: REVIEW_OPTION_ADD_COMMENT,
    payload: {
      reviewId: reviewId,
      optionId: optionId,
      comment: comment,
    }
  };
}


export function setOptionViewing(optionId) {
  return {
    type: REVIEW_OPTION_VIEWING,
    payload: {
      optionId: optionId,
    }
  };
}
export function optionSelected(slug, optionId) {
  return {
    type: REVIEW_OPTION_SELECTED,
    payload: {
      slug: slug,
      optionId: optionId,
    }
  };
}
export function optionCleared(slug) {
  return {
    type: REVIEW_OPTION_CLEARED,
    payload: {
      slug: slug,
    }
  };
}


export function hideFeedback() {
  return {
    type: REVIEW_FEEDBACK_HIDE,
  };
}
export function showApprovalForm() {
  return {
    type: REVIEW_APPROVAL_SHOW,
  };
}
export function hideApprovalForm() {
  return {
    type: REVIEW_APPROVAL_HIDE,
  };
}
export function approveProject(reviewId, signature) {
  return {
    type: REVIEW_APPROVE_PROJECT,
    payload: {
      reviewId: reviewId,
      signature: signature,
    }
  };
}

export function updatingReview() {
  return {
    type: REVIEW_UPDATING,
  };
}

export function updateReviewSuccess(slug, review) {
  return {
    type: REVIEW_UPDATE_SUCCESS,
    payload: {
      date: new Date(),
      slug: slug,
      review: review,
    },
  };
}
export function updateReviewFailed(error) {
  return {
    type: REVIEW_UPDATE_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}


export default {
  resetReview,
  addReviews,

  showComments,
  hideComments,
  addOptionComment,

  setOptionViewing,
  optionSelected,
  optionCleared,

  showApprovalForm,
  hideApprovalForm,
  approveProject,

  updatingReview,
  updateReviewSuccess,
  updateReviewFailed,
};
