export const ACCOUNTS_FETCHING = 'ACCOUNTS_FETCHING';
export const ACCOUNTS_FETCH_SUCCESS = 'ACCOUNTS_FETCH_SUCCESS';
export const ACCOUNTS_FETCH_FAILED = 'ACCOUNTS_FETCH_FAILED';
export const ACCOUNTS_RESET = 'ACCOUNTS_RESET';
export const ACCOUNTS_SET_SELECTED = 'ACCOUNTS_SET_SELECTED';


export function fetchingAccounts() {
  return {
    type: ACCOUNTS_FETCHING,
  };
}
export function fetchAccountsSuccess(json) {
  return {
    type: ACCOUNTS_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      accounts: json,
    }
  };
}
export function fetchAccountsFailed(error) {
  return {
    type: ACCOUNTS_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}
export function resetAccounts() {
  return {
    type: ACCOUNTS_RESET,
  };
}


export default {
  fetchingAccounts,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  resetAccounts,
}
