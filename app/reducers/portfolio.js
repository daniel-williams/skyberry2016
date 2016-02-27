import {fromJS} from 'immutable';

import constants from '../constants';
import * as portfolioActions from '../actions/portfolioActions';


let initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  options: constants.portfolio.options,
  items: {},
  selected: constants.portfolio.selected,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case portfolioActions.FETCHING_PORTFOLIO: {
      return state.set('isFetching', true);
    }
    case portfolioActions.FETCH_PORTFOLIO_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.setIn(['items', action.payload.key], fromJS(action.payload.images));
        return state;
      });
    }
    case portfolioActions.FETCH_PORTFOLIO_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case portfolioActions.SET_SELECTED_PORTFOLIO: {
      return state.set('selected', action.payload.key);
    }
    default:
      return state;
  }
}
