import {Map, List, fromJS} from 'immutable';

import * as featuredActions from '../actions/featuredActions';

const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  hasFetched: false,
  items: [],
});

export default function(state = initialState, action) {
  switch(action.type) {
    case featuredActions.FEATURED_FETCHING: {
      return state.withMutations(state => {
        state.set('isFetching', true);
        return state;
      });
    }
    case featuredActions.FEATURED_FETCH_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.set('hasFetched', true);
        state.set('items', fromJS(action.payload.items));
        return state;
      });
    }
    case featuredActions.FEATURED_FETCH_FAILED: {
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
