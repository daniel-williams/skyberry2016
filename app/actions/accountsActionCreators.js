import {getJson} from '../services/FetchService';

import {
  ACCOUNTS_FETCHING,
  ACCOUNTS_FETCH_SUCCESS,
  ACCOUNTS_FETCH_FAILED,
  ACCOUNTS_CLEAR,
} from '.';


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
      items: json,
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
export function clearAccounts() {
  return {
    type: ACCOUNTS_CLEAR,
  };
}
