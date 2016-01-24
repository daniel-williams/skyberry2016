import {fromJS} from 'immutable';

import {
  ACCOUNTS_FETCHING,
  ACCOUNTS_FETCH_SUCCESS,
  ACCOUNTS_FETCH_FAILED,
  ACCOUNTS_CLEAR,
} from '../actions';

const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  hasFetched: false,
  items: [],
});


export default function(state = initialState, action) {
  switch(action.type) {
    case ACCOUNTS_FETCHING: {
      return state.withMutations(state => {
        state.set('isFetching', true);
        return state;
      });
    }
    case ACCOUNTS_FETCH_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.set('hasFetched', true);
        state.set('items', fromJS(action.payload.items));
        return state;
      });
    }
    case ACCOUNTS_FETCH_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case ACCOUNTS_CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
