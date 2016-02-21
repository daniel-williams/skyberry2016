import {fromJS, Map} from 'immutable';

import * as reviewActions from '../actions/reviewActions';

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
    case reviewActions.MERGE_INCOMING_REVIEWS: {
      return state.withMutations(state => {
        // TODO: find the correct way to merge into map without toJS()
        const currentReviews = state.get('reviews').toJS();
        const mergedReviews = Object.assign({}, currentReviews, action.payload.reviews);
        state.set('reviews', fromJS(mergedReviews));
        return state;
      });
    }
    case reviewActions.REVIEW_UI_RESET: {
      return state.withMutations(state => {
        state.set('showFeedback', true);
        state.set('showApproval', false);
        // state.set('showComments', false);
        // state.set('optionViewing', false);
        // state.set('steps', initialStepState);
        return state;
      });
    }
    // case reviewActions.REVIEW_STEP_TOGGLED: {
    //   const key = action.payload.key;
    //   const val = !!state.getIn(['steps', key]);
    //   return state.setIn(['steps', key], !val);
    // }
    // case reviewActions.REVIEW_COMMENTS_TOGGLED: {
    //   return state.set('showComments', !state.get('showComments'));
    // }
    case reviewActions.REVIEW_SHOW_FEEDBACK: {
      return state.set('showFeedback', true);
    }
    case reviewActions.REVIEW_HIDE_FEEDBACK: {
      return state.set('showFeedback', false);
    }
    case reviewActions.REVIEW_SHOW_APPROVAL: {
      return state.withMutations(state => {
        state.set('showFeedback', false);
        state.set('showApproval', true);
        return state;
      });
    }
    case reviewActions.REVIEW_HIDE_APPROVAL: {
      return state.withMutations(state => {
        state.set('showFeedback', true);
        state.set('showApproval', false);
        return state;
      });
    }
    case reviewActions.REVIEW_OPTION_SET_SELECTED: {
      return state.withMutations(state => {

        const slug = action.payload.slug;
        const currentReview = state.getIn(['reviews', slug]).toJS();
        const newReview = Object.assign({}, currentReview, {
          selectedId: action.payload.optionId,
          requestById: null,
          requestByName: null,
          requestByIp: null,
          requestDate: null,
          requestType: 0,
          ApprovedById: null,
          ApprovedByName: null,
          ApprovedByIp: null,
          ApprovedDate: null,
        });
        state.setIn(['reviews', slug], fromJS(newReview));
        return state;
      });
    }
    case reviewActions.REVIEW_OPTION_CLEAR_SELECTED: {
      return state.withMutations(state => {
        const slug = action.payload.slug;
        const currentReview = state.getIn(['reviews', slug]).toJS();
        const newReview = Object.assign({}, currentReview, {
          selectedId: null,
          requestById: null,
          requestByName: null,
          requestByIp: null,
          requestDate: null,
          requestType: 0,
          ApprovedById: null,
          ApprovedByName: null,
          ApprovedByIp: null,
          ApprovedDate: null,
        });
        state.setIn(['reviews', slug], fromJS(newReview));
        return state;
      });
    }
    // case reviewActions.REVIEW_OPTION_SET_VIEWING: {
    //   return state.set('optionViewing', action.payload.optionId);
    // }
    case reviewActions.UPDATE_REVIEW: {
      return state.set('isUpdating', true);
    }
    case reviewActions.UPDATE_REVIEW_SUCCESS: {
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
    case reviewActions.UPDATE_REVIEW_FAILED: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('lastUpdateDate', action.payload.date);
        state.set('lastUpdateError', action.payload.error);
        return state;
      });
    }
    case reviewActions.REVIEW_REQUEST_REVISION: {
      const slug = action.payload.slug;
      const currentReview = state.getIn(['reviews', slug]).toJS();
      const newReview = Object.assign({}, currentReview, action.payload.result);
      return state.setIn(['reviews', slug], fromJS(newReview));
    }
    case reviewActions.REVIEW_REQUEST_DELIVERABLES: {
      const slug = action.payload.slug;
      const currentReview = state.getIn(['reviews', slug]).toJS();
      const newReview = Object.assign({}, currentReview, action.payload.result);
      return state.setIn(['reviews', slug], fromJS(newReview));
    }
    case reviewActions.REVIEW_REQUEST_CANCELED: {
      const slug = action.payload.slug;
      const currentReview = state.getIn(['reviews', slug]).toJS();
      const newReview = Object.assign({}, currentReview, {
        requestById: null,
        requestByName: null,
        requestByIp: null,
        requestType: null,
        requestDate: null,

        approvedById: null,
        approvedByName: null,
        approvedByIp: null,
        approvedType: null,
        approvedDate: null,
      });
      return state.setIn(['reviews', slug], fromJS(newReview));
    }
    case reviewActions.REVIEW_APPROVE_PROJECT: {
      const slug = action.payload.slug;
      const currentReview = state.getIn(['reviews', slug]).toJS();
      const newReview = Object.assign({}, currentReview, action.payload.result);
      return state.setIn(['reviews', slug], fromJS(newReview));
    }
    default: {
      return state;
    }
  }
}
