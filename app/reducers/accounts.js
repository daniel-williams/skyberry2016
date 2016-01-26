import {fromJS} from 'immutable';

import {NameValueMap, ToKeyMap} from '../utils/CollectionUtils';
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
        console.log('todo: moving projects stuff outa accounts');
        const accountKeyMap = ToKeyMap(action.payload.accounts);
        const accountOptions = NameValueMap(action.payload.accounts);
        const projectOptions = action.payload.accounts.length ? NameValueMap(action.payload.accounts[0].projects) : [];
        state.set('accounts', fromJS(accountKeyMap));
        state.set('accountOptions', fromJS(accountOptions));
        state.set('projectOptions', fromJS(projectOptions))
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
      if(state.get('accounts').has(action.payload.key)) {
        const selectedAccount = state.getIn(['accounts', action.payload.key]).toJS();
        return state.withMutations(state => {
          state.set('selectedKey', selectedAccount.id);
          state.set('projectOptions', fromJS(NameValueMap(selectedAccount.projects)));
          return state;
        });
      }
    }
    case ACCOUNTS_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
