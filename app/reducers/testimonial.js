import {fromJS} from 'immutable';

import * as testimonialActions from '../actions/testimonialActions';

const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  hasFetched: false,
  items: [],
});

export default function(state = initialState, action) {
  switch(action.type) {
    case testimonialActions.TESTIMONIALS_FETCHING: {
      return state.set('isFetching', true);
    }
    case testimonialActions.TESTIMONIALS_FETCH_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.set('hasFetched', true);
        state.set('items', fromJS(action.payload.items));
        return state;
      });
    }
    case testimonialActions.TESTIMONIALS_FETCH_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
