export const REVIEW_ADD_REVIEWS = 'REVIEW_ADD_REVIEWS';


export const REVIEW_OPTION_VIEW = 'REVIEW_OPTION_VIEW';
export const REVIEW_COMMENTS_SHOW = 'REVIEW_COMMENTS_SHOW';
export const REVIEW_COMMENTS_HIDE = 'REVIEW_COMMENTS_HIDE';


export const REVIEW_UPDATING = 'REVIEW_UPDATING';
export const REVIEW_UPDATE_SUCCESS = 'REVIEW_UPDATE_SUCCESS';
export const REVIEW_UPDATE_FAILED = 'REVIEW_UPDATE_FAILED';

export const REVIEW_OPTION_SELECT = 'REVIEW_OPTION_SELECT';
export const REVIEW_OPTION_CLEAR = 'REVIEW_OPTION_CLEAR';

export const REVIEW_OPTION_ADD_COMMENT = 'REVIEW_OPTION_ADD_COMMENT';

export const REVIEW_REQUEST_REVISION = 'REVIEW_REQUEST_REVISION';
export const REVIEW_REQUEST_DELIVERABLES = 'REVIEW_REQUEST_DELIVERABLES';
export const REVIEW_REQUEST_CLEAR = 'REVIEW_REQUEST_CLEAR';

export const REVIEW_APPROVAL_SHOW = 'REVIEW_APPROVAL_SHOW';
export const REVIEW_APPROVAL_HIDE = 'REVIEW_APPROVAL_HIDE';
export const REVIEW_ADD_APPROVAL = 'REVIEW_ADD_APPROVAL';


export function addReviews(compositeSlug, reviews) {
  return {
    type: REVIEW_ADD_REVIEWS,
    payload: {
      compositeSlug: compositeSlug,
      reviews: reviews,
    }
  };
}

export function showReviewComments() {
  return {
    type: REVIEW_COMMENTS_SHOW,
  };
}
export function hideReviewComments() {
  return {
    type: REVIEW_COMMENTS_HIDE,
  };
}
export function addReviewOptionComment(reviewId, optionId, comment) {
  return {
    type: REVIEW_OPTION_ADD_COMMENT,
    payload: {
      reviewId: reviewId,
      optionId: optionId,
      comment: comment,
    }
  };
}


export function selectReviewOption(reviewId, optionId) {
  return {
    type: REVIEW_OPTION_SELECT,
    payload: {
      reviewId: reviewId,
      optionId: optionId,
    }
  };
}
export function clearReviewOption(reviewId) {
  return {
    type: REVIEW_OPTION_CLEAR,
    payload: {
      reviewId: reviewId,
    }
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


export default {
  addReviews,
  showReviewComments,
  hideReviewComments,
  addReviewOptionComment,

  selectReviewOption,
  clearReviewOption,

  showApprovalForm,
  hideApprovalForm,
}
