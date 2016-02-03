import {fromJS} from 'immutable';

import {
  REVIEW_ADD_REVIEWS,
  REVIEW_RESET_UI,
  REVIEW_COMMENTS_SHOW,
  REVIEW_COMMENTS_HIDE,
  REVIEW_FEEDBACK_SHOW,
  REVIEW_FEEDBACK_HIDE,
  REVIEW_APPROVAL_SHOW,
  REVIEW_APPROVAL_HIDE,
  REVIEW_UPDATING,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAILED,
  REVIEW_OPTION_SELECT,
  REVIEW_OPTION_CLEAR,
  REVIEW_OPTION_ADD_COMMENT,
  REVIEW_REQUEST_REVISION,
  REVIEW_REQUEST_DELIVERABLES,
  REVIEW_REQUEST_CLEAR,
  REVIEW_APPROVE_PROJECT,
} from '../actions/reviewActions';


// const REVIEW_STEP = {
//   REVIEW: 'REVIEW',
//   FEEDBACK: 'FEEDBACK',
//   REVISION: 'REVISION',
//   DELIVERABLES: 'DELIVERABLES',
//   APPROVAL: 'APPROVAL',
//   ACCEPTED: 'ACCEPTED',
// };

const initialState = fromJS({
  isUpdating: false,
  lastUpdateDate: null,
  lastUpdateError: null,

  showFeedback: true,
  showApproval: false,
  showComments: false,

  reviews: [],
});

export default function(state = initialState, action) {
  switch(action.type) {
    case REVIEW_ADD_REVIEWS: {
      return state.withMutations(state => {
        // TODO: find the correct way to merge into map without toJS()
        const currentReviews = state.get('reviews').toJS();
        const newReviews = Object.assign({}, currentReviews, action.payload.reviews);
        state.set('reviews', fromJS(newReviews));
        return state;
      });
    }
    case REVIEW_RESET_UI: {
      console.log('reset review ui');
      return state.withMutations(state => {
        state.set('showFeedback', true);
        state.set('showApproval', false);
        state.set('showComments', false);
        return state;
      });
    }
    case REVIEW_COMMENTS_SHOW: {
      return state.set('showComments', true);
    }
    case REVIEW_COMMENTS_HIDE: {
      return state.set('showComments', false);
    }
    case REVIEW_FEEDBACK_SHOW: {
      return state.set('showFeedback', true);
    }
    case REVIEW_FEEDBACK_HIDE: {
      return state.set('showFeedback', false);
    }
    case REVIEW_APPROVAL_SHOW: {
      return state.withMutations(state => {
        state.set('showFeedback', false);
        state.set('showApproval', true);
        return state;
      });
    }
    case REVIEW_APPROVAL_HIDE: {
      return state.withMutations(state => {
        state.set('showFeedback', true);
        state.set('showApproval', false);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
