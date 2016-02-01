
export const REVIEW_ADD_REVIEWS = 'REVIEW_ADD_REVIEWS';
export const REVIEW_SHOW = 'REVIEW_SHOW';
export const REVIEW_HIDE = 'REVIEW_HIDE';

export function showReview() {
  return {
    type: REVIEW_SHOW,
  };
}

export function hideReview() {
  return {
    type: REVIEW_HIDE,
  };
}

export function addReviews(compositeSlug, reviews) {
  console.log('LOOKIE');
  return {
    type: REVIEW_ADD_REVIEWS,
    payload: {
      compositeSlug: compositeSlug,
      reviews: reviews,
    }
  };
}


export default {
  showReview,
  hideReview,
  addReviews,
}
