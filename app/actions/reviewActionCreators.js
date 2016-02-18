import FetchService from '../services/FetchService';
import {
  optionSelected,
  optionCleared,

  requestSuccess,
  clearRequest,

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

export function requestRevision(slug) {
  return function(dispatch, getState) {
    dispatch(updatingReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return FetchService.getJson('/api/reviews/' + id + '/revision', true)
      .then((json) => {
        dispatch(requestSuccess(slug, json.result));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function requestDeliverables(slug) {
  return function(dispatch, getState) {
    dispatch(updatingReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return FetchService.getJson('/api/reviews/' + id + '/deliverables', true)
      .then((json) => {
        dispatch(requestSuccess(slug, json.result));
        dispatch(updateReviewSuccess());
      })
      .catch(error => {
        dispatch(updateReviewFailed(error));
      });
  };
}
export function requestClear(slug) {
  return function(dispatch, getState) {
    dispatch(updatingReview());

    const id = getState().getIn(['review', 'reviews', slug, 'id']);

    return FetchService.getJson('/api/reviews/' + id + '/clear-request', true)
      .then(() => {
        dispatch(clearRequest(slug));
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

  requestRevision,
  requestDeliverables,
  requestClear,
};
