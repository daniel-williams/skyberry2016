import {Record, Map, fromJS} from 'immutable';

import {
  PORTFOLIO_SET,
  PORTFOLIO_FETCHING,
  PORTFOLIO_FETCH_SUCCESS,
  PORTFOLIO_FETCH_FAILED,
} from '../actions';

let PortfolioRecord = new Record({key: '0', images: []});

let initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  key: null,
  collections: new Map(),
});

export default function(state = initialState, action) {
  switch(action.type) {
    case PORTFOLIO_FETCHING: {
      return state.set('isFetching', true);
    }
    case PORTFOLIO_FETCH_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);
        state.setIn(['collections', action.payload.key], fromJS(action.payload.images));
        return state;
      });
    }
    case PORTFOLIO_FETCH_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case PORTFOLIO_SET: {
      return state.set('key', action.payload.key);
    }
    default:
      return state;
  }
}
