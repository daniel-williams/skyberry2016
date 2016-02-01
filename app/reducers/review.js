import {fromJS} from 'immutable';

import {
  REVIEW_ADD_REVIEWS,
  REVIEW_SHOW,
  REVIEW_HIDE,
} from '../actions/reviewActions';


const REVIEW_STEP = {
  REVIEW: 'REVIEW',
  FEEDBACK: 'FEEDBACK',
  REVISION: 'REVISION',
  DELIVERABLES: 'DELIVERABLES',
  APPROVAL: 'APPROVAL',
  ACCEPTED: 'ACCEPTED',
};

const initialState = fromJS({
  isActive: false,
  reviews: [],
});

export default function(state = initialState, action) {
  switch(action.type) {
    case REVIEW_ADD_REVIEWS: {
      // const rootSlug = action.payload.rootSlug;
      return state.withMutations(state => {
        const currentReviews = state.get('reviews').toJS();
        const newReviews = Object.assign({}, currentReviews, action.payload.reviews);
        state.set('reviews', fromJS(newReviews));
        return state;
      });
    }
    case REVIEW_SHOW: {
      return state.set('isActive', true);
    }
    case REVIEW_HIDE: {
      return state.set('isActive', false);
    }
    default: {
      return state;
    }
  }
}
