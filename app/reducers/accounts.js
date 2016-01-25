import {fromJS} from 'immutable';

import {NameValueMap, ToKeyMap} from '../utils/CollectionUtils';
import {
  ACCOUNTS_FETCHING,
  ACCOUNTS_FETCH_SUCCESS,
  ACCOUNTS_FETCH_FAILED,
  ACCOUNTS_CLEAR,
  ACCOUNTS_SET_SELECTED,
} from '../actions';


const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  hasFetched: false,
  accounts: {},
  selectedKey: null,
  accountOptions: [],
  projectOptions: [],
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

        state.set('hasFetched', true);
        state.set('accounts', fromJS(ToKeyMap(action.payload.accounts)));
        state.set('accountOptions', fromJS(NameValueMap(action.payload.accounts)));
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
      console.log('ACCOUNTS_SET_SELECTED');
      const selectedAccount = state.getIn(['accounts', action.payload.key]);
      if(!selectedAccount) {
        return state;
      }
      return state.withMutations(state => {
        state.set('selectedKey', selectedAccount.id);
        state.set('projectOptions', fromJS(NameValueMap(selectedAccount.projects)));
        console.log('wtf');
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
