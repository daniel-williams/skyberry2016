import * as accountActions from './accountActions';


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
  fetchAccounts,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  resetAccounts,
  setAccountMap,
  setAccountOptions,
}
