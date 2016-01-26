import TokenService from '../services/TokenService';
import FetchService from '../services/FetchService';

import {
  fetchingIdentity,
  fetchIdentitySuccess,
  fetchIdentityFailed,
  resetIdentity,
} from '../actions/identityActions';
import {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
} from '../actions/userActions';
import {
  fetchingAccounts,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  resetAccounts,
} from '../actions/accountActions';


export function recoverIndentity() {
  return function(dispatch, getState) {

    const {accessToken, refreshToken} = TokenService.getTokens();
    if(!accessToken && !refreshToken) return;

    dispatch(fetchingIdentity());
    return loadAccountData(dispatch, getState)(FetchService.refreshIdentity(refreshToken));
  }
}

export function logOn(formData) {
  return function(dispatch, getState) {

    const {username, password} = formData;
    dispatch(fetchingIdentity());

    return loadAccountData(dispatch, getState)(FetchService.signIn(username, password));
  }
}

export function logOff() {
  return function(dispatch) {
    TokenService.clearTokens();
    dispatch(resetUser());
    dispatch(resetIdentity());
    dispatch(resetAccounts());
  };
}


const loadAccountData = (dispatch, getState) => (promise) => {
  return promise.then(identity => {
    TokenService.setTokens(identity.access_token, identity.refresh_token);
    dispatch(fetchIdentitySuccess(identity));
    dispatch(fetchingUser());
    dispatch(fetchingAccounts());

    return Promise.all([
        FetchService.getUser(identity.userId),
        FetchService.getAccounts(identity.userId)
      ])
      .then(res => {
        dispatch(fetchUserSuccess(res[0]));
        dispatch(fetchAccountsSuccess(res[1]));
      })
      .catch(error => {
        dispatch(fetchUserFailed(error));
        dispatch(fetchAccountsFailed(error));
        return Promise.reject(error);
      });
  })
  .catch(error => {
    TokenService.clearTokens();
    dispatch(fetchIdentityFailed(error));
    console.log('error@loadAccountData:', error);
    return Promise.reject(error);
  });
}


export default {
  recoverIndentity,
  logOn,
  logOff,
}
