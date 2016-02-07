import {fromJS, Map} from 'immutable';

import {
  REVIEW_ADD_REVIEWS,
  REVIEW_RESET_UI,
  REVIEW_STEP_TOGGLE,
  REVIEW_COMMENTS_TOGGLE,
  REVIEW_FEEDBACK_SHOW,
  REVIEW_FEEDBACK_HIDE,
  REVIEW_APPROVAL_SHOW,
  REVIEW_APPROVAL_HIDE,
  REVIEW_UPDATING,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAILED,
  REVIEW_OPTION_VIEWING,
  REVIEW_OPTION_SELECTED,
  REVIEW_OPTION_CLEARED,
  REVIEW_OPTION_ADD_COMMENT,
  REVIEW_REQUEST_REVISION,
  REVIEW_REQUEST_DELIVERABLES,
  REVIEW_REQUEST_CLEAR,
  REVIEW_APPROVE_PROJECT,
} from '../actions/reviewActions';

const initialStepState = fromJS({
  review: false,
  feedback: true,
  request: false,
  approval: false,
  acceptance: false,
});
const initialState = fromJS({
  isUpdating: false,
  lastUpdateDate: null,
  lastUpdateError: null,

  showFeedback: true,
  showApproval: false,
  showComments: false,
  steps: initialStepState,
  optionViewing: null,

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
      return state.withMutations(state => {
        state.set('showFeedback', true);
        state.set('showApproval', false);
        state.set('showComments', false);
        state.set('optionViewing', false);
        state.set('steps', initialStepState);
        return state;
      });
    }
    case REVIEW_STEP_TOGGLE: {
      const key = action.payload.key;
      const val = !!state.getIn(['steps', key]);
      return state.setIn(['steps', key], !val);
    }
    case REVIEW_COMMENTS_TOGGLE: {
      return state.set('showComments', !state.get('showComments'));
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
    case REVIEW_OPTION_SELECTED: {
      return state.withMutations(state => {

        const slug = action.payload.slug;
        const currentReview = state.getIn(['reviews', slug]).toJS();
        const newReview = Object.assign({}, currentReview, {
          selectedId: action.payload.optionId,
          requestById: null,
          requestByName: null,
          requestDate: null,
          requestType: 0,
          ApprovedById: null,
          ApprovedByName: null,
          ApprovedDate: null,
        });
        state.setIn(['reviews', slug], fromJS(newReview));
        return state;
      });
    }
    case REVIEW_OPTION_CLEARED: {
      return state.withMutations(state => {
        const slug = action.payload.slug;
        const currentReview = state.getIn(['reviews', slug]).toJS();
        const newReview = Object.assign({}, currentReview, {
          selectedId: null,
          requestById: null,
          requestByName: null,
          requestDate: null,
          requestType: 0,
          ApprovedById: null,
          ApprovedByName: null,
          ApprovedDate: null,
        });
        state.setIn(['reviews', slug], fromJS(newReview));
        return state;
      });
    }
    case REVIEW_OPTION_VIEWING: {
      return state.set('optionViewing', action.payload.optionId);
    }
    case REVIEW_UPDATING: {
      return state.set('isUpdating', true);
    }
    case REVIEW_UPDATE_SUCCESS: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('lastUpdateDate', action.payload.date);
        state.set('lastUpdateError', null);

        // const slug = action.payload.slug;
        // const currentReview = state.getIn(['reviews', slug]).toJS();
        // const newReview = Object.assign({}, currentReview, action.payload.review);
        // state.setIn(['reviews', slug], fromJS(newReview));
        return state;
      });
    }
    case REVIEW_UPDATE_FAILED: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('lastUpdateDate', action.payload.date);
        state.set('lastUpdateError', action.payload.error);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
