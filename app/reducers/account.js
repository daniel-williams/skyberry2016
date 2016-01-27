import {fromJS} from 'immutable';

import {NameValueMap, ToKeyMap, AddSlug} from '../utils/CollectionUtils';
import {
  ACCOUNTS_FETCHING,
  ACCOUNTS_FETCH_SUCCESS,
  ACCOUNTS_FETCH_FAILED,
  ACCOUNTS_SET_SELECTED,
  ACCOUNTS_RESET,
} from '../actions/accountActions';


const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  hasFetched: false,
  accounts: {},
  selectedKey: null,
  accountOptions: [],
});


export default function(state = initialState, action) {
  switch(action.type) {
    case ACCOUNTS_FETCHING: {
      return state.set('isFetching', true);
    }
    case ACCOUNTS_FETCH_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        const accounts = action.payload.accounts;
        const accountsKeyMap = ToKeyMap(accounts, 'slug');
        const accountOptions = NameValueMap(accounts, 'name', 'slug');
        state.set('hasFetched', true);
        state.set('accounts', fromJS(accountsKeyMap));
        state.set('accountOptions', fromJS(accountOptions));
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
    case ACCOUNTS_SET_SELECTED: {
      return state.set('selectedKey', action.payload.key);
    }
    case ACCOUNTS_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
