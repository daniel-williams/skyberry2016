import {fromJS, Map} from 'immutable';

import * as actions from '../actions/reviewActions';

const initialState = fromJS({
  isUpdating: false,
  lastUpdateDate: null,
  lastUpdateError: null,

  showFeedback: true,
  showApproval: false,

  comment: null,
  isPostingComment: false,

  reviews: [],
});

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.MERGE_INCOMING_REVIEWS: {
      return state.withMutations(state => {
        // TODO: find the correct way to merge into map without toJS()
        const currentReviews = state.get('reviews').toJS();
        const mergedReviews = Object.assign({}, currentReviews, action.payload.reviews);
        state.set('reviews', fromJS(mergedReviews));
        return state;
      });
    }
    case actions.REVIEW_UI_RESET: {
      return state.withMutations(state => {
        state.set('showFeedback', true);
        state.set('showApproval', false);
        return state;
      });
    }
    case actions.REVIEW_SHOW_FEEDBACK: {
      return state.set('showFeedback', true);
    }
    case actions.REVIEW_HIDE_FEEDBACK: {
      return state.set('showFeedback', false);
    }
    case actions.REVIEW_SHOW_APPROVAL: {
      return state.withMutations(state => {
        state.set('showFeedback', false);
        state.set('showApproval', true);
        return state;
      });
    }
    case actions.REVIEW_HIDE_APPROVAL: {
      return state.withMutations(state => {
        state.set('showFeedback', true);
        state.set('showApproval', false);
        return state;
      });
    }
    case actions.REVIEW_OPTION_SET_SELECTED: {
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
    case actions.REVIEW_OPTION_CLEAR_SELECTED: {
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
    case actions.REVIEW_OPTION_POST_COMMENT: {
      return state.withMutations(state => {
        state.set('isPostingComment', true);
        state.set('comment', action.payload.comment);
        return state;
      });
    }
    case actions.REVIEW_OPTION_POST_COMMENT_SUCCESS: {
      return state.withMutations(state => {
        state.set('lastUpdateDate', action.payload.date);
        state.set('isPostingComment', false);
        state.set('comment', null);

        const slug = action.payload.slug;
        let comments = state.getIn(['reviews', slug, 'comments']).toJS();
        comments.push(action.payload.comment);
        comments.sort((a, b) => {
          const da = new Date(a.created).getTime();
          const db = new Date(b.created).getTime();
          var temp = da < db ? 1 : da > db ? -1 : 0;
          return temp;
        });
        state.setIn(['reviews', slug, 'comments'], fromJS(comments));
        return state;
      });
    }
    case actions.REVIEW_OPTION_POST_COMMENT_FAILED: {
      return state.withMutations(state => {
        state.set('isPostingComment', false);
        state.set('lastUpdateDate', action.payload.date);
        state.set('lastUpdateError', action.payload.error);
        return state;
      });
    }
    case actions.UPDATE_REVIEW: {
      return state.set('isUpdating', true);
    }
    case actions.UPDATE_REVIEW_SUCCESS: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('lastUpdateDate', action.payload.date);
        state.set('lastUpdateError', null);
        return state;
      });
    }
    case actions.UPDATE_REVIEW_FAILED: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('lastUpdateDate', action.payload.date);
        state.set('lastUpdateError', action.payload.error);
        return state;
      });
    }
    case actions.REVIEW_REQUEST_REVISION: {
      // fallthrough
    }
    case actions.REVIEW_REQUEST_DELIVERABLES: {
      // fallthrough
    }
    case actions.REVIEW_REQUEST_CANCELED: {
      // fallthrough
    }
    case actions.REVIEW_APPROVE_PROJECT: {
      const slug = action.payload.slug;
      const currentReview = state.getIn(['reviews', slug]).toJS();
      const newReview = Object.assign({}, currentReview, action.payload.result);
      return state.setIn(['reviews', slug], fromJS(newReview));
    }
    case actions.RESET_REVIEWS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
