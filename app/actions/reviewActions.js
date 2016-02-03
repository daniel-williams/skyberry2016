export const REVIEW_ADD_REVIEWS = 'REVIEW_ADD_REVIEWS';

export const REVIEW_RESET_UI = 'REVIEW_RESET_UI';

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

export const REVIEW_OPTION_SELECT = 'REVIEW_OPTION_SELECT';
export const REVIEW_OPTION_CLEAR = 'REVIEW_OPTION_CLEAR';
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


export function selectOption(reviewId, optionId) {
  return {
    type: REVIEW_OPTION_SELECT,
    payload: {
      reviewId: reviewId,
      optionId: optionId,
    }
  };
}
export function clearSelectedOption(reviewId) {
  return {
    type: REVIEW_OPTION_CLEAR,
    payload: {
      reviewId: reviewId,
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



export default {
  resetReview,
  addReviews,

  showComments,
  hideComments,
  addOptionComment,

  selectOption,
  clearSelectedOption,

  showApprovalForm,
  hideApprovalForm,
  approveProject,
};
