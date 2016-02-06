import FetchService from '../services/FetchService';
import {
  optionSelected,
  optionCleared,
  updatingReview,
  updateReviewSuccess,
  updateReviewFailed,
} from './reviewActions';


export function selectOption(slug, optionId) {
  return function(dispatch, getState) {
    dispatch(updatingReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return FetchService.getJson('/api/reviews/' + id + '/options/' + optionId, true)
      .then(() => {
        dispatch(optionSelected(slug, optionId));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function clearOption(slug) {
  return function(dispatch, getState) {
    dispatch(updatingReview());

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


export default {
  selectOption,
  clearOption,
}
