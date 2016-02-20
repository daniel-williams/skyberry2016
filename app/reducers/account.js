import {fromJS} from 'immutable';

import * as accountActions from '../actions/accountActions';


const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  hasFetched: false,
  accounts: {},
  accountOptions: [],
});


export default function(state = initialState, action) {
  switch(action.type) {
    case accountActions.FETCH_ACCOUNTS: {
      return state.set('isFetching', true);
    }
    case accountActions.FETCH_ACCOUNTS_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.set('hasFetched', true);
        state.set('accounts', fromJS(action.payload.accounts));
        return state;
      });
    }
    case accountActions.FETCH_ACCOUNTS_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case accountActions.SET_ACCOUNT_MAP: {
      return state.set('accountMap', fromJS(action.payload.accountMap));
    }
    case accountActions.SET_ACCOUNT_OPTIONS: {
      return state.set('accountOptions', fromJS(action.payload.accountOptions));
    }
    case accountActions.RESET_ACCOUNTS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
