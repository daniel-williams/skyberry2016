import SkyberryFetch from '../services/SkyberryFetchService';

import * as accountActions from './accountActions';


export function fetchAccountAsNeeded(slug) {
  return function(dispatch, getState) {
    const state = getState();
    let id = null;
    try {
      id = state.getIn(['account', 'accountMap', slug, 'id']);
    } catch(e) {}

    if(id) {
      const loaded = state.getIn(['account', 'accountMap', slug, 'loaded']);
      // TODO: determine when and where to check/break on fetch error
      if(!loaded) {
        loadAccount(id, slug)(dispatch, getState);
      }
    }
  }
}


// internal helper functions
function loadAccount(id, slug) {
  return function(dispatch) {
    dispatch(fetchAccount());

    return SkyberryFetch.loadAccount(id)
      .then(json => {
        dispatch(fetchAccountSuccess(slug, json));
      })
      .catch(error => {
        dispatch(fetchAccountFailed(error));
      });
  };
}



export function fetchAccount() {
  return {
    type: accountActions.FETCH_ACCOUNT,
  };
}
export function fetchAccountSuccess(slug, account) {
  return {
    type: accountActions.FETCH_ACCOUNT_SUCCESS,
    payload: {
      date: new Date(),
      slug: slug,
      account: account,
    }
  };
}
export function fetchAccountFailed(error) {
  return {
    type: accountActions.FETCH_ACCOUNT_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}





export function fetchAccounts() {
  return {
    type: accountActions.FETCH_ACCOUNTS,
  };
}
export function fetchAccountsSuccess(accounts) {
  return {
    type: accountActions.FETCH_ACCOUNTS_SUCCESS,
    payload: {
      date: new Date(),
      accounts: accounts,
    }
  };
}
export function fetchAccountsFailed(error) {
  return {
    type: accountActions.FETCH_ACCOUNTS_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}
export function resetAccounts() {
  return {
    type: accountActions.RESET_ACCOUNTS,
  };
}

export function setAccountMap(accountMap) {
  return {
    type: accountActions.SET_ACCOUNT_MAP,
    payload: {
      accountMap: accountMap,
    }
  };
}
export function setAccountOptions(accountOptions) {
  return {
    type: accountActions.SET_ACCOUNT_OPTIONS,
    payload: {
      accountOptions: accountOptions,
    }
  };
}


export default {
  fetchAccountAsNeeded,
  fetchAccounts,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  resetAccounts,
  setAccountMap,
  setAccountOptions,
}
