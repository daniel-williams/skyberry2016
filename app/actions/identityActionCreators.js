
import constants from '../constants';
import {setTokens, getTokens, clearTokens} from '../services/TokenService';
import {
  refreshIdentity,
  signIn,
  getUser,
  getAccounts,
} from '../services/FetchService';
import {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
} from './userActionCreators';
import {
  fetchingAccounts,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  clearAccounts,
} from './accountsActionCreators';
import {
  IDENTITY_REQUESTED,
  IDENTITY_REQUEST_SUCCESS,
  IDENTITY_REQUEST_FAILED,
  IDENTITY_RESET,
} from '.';


export function recoverIndentity() {
  return function(dispatch, getState) {

    const {accessToken, refreshToken} = getTokens();
    if(!accessToken && !refreshToken) return;

    dispatch(requestIdentity());

    refreshIdentity(refreshToken)
      .then(identity => {
        dispatch(setIdentity(identity));
        dispatch(fetchingUser());
        dispatch(fetchingAccounts());

        Promise.all([
            getUser(identity.userId),
            getAccounts(identity.userId)
          ])
          .then(res => {
            dispatch(fetchUserSuccess(res[0]));
            dispatch(fetchAccountsSuccess(res[1]));
          })
          .catch(error => {
            dispatch(fetchUserFailed(error));
            dispatch(fetchAccountsFailed(error));
          });
      })
      .catch(error => dispatch(requestIdentityFailed(error)));
  }
}

export function logOn(formData) {
  return function(dispatch, getState) {

    const {username, password} = formData;
    dispatch(requestIdentity());

    signIn(username, password)
      .then(identity => {
        dispatch(setIdentity(identity));
        dispatch(fetchingUser());
        dispatch(fetchingAccounts());

        Promise.all([
            getUser(identity.userId),
            getAccounts(identity.userId)
          ])
          .then(res => {
            dispatch(fetchUserSuccess(res[0]));
            dispatch(fetchAccountsSuccess(res[1]));
          })
          .catch(error => {
            dispatch(fetchUserFailed(error));
            dispatch(fetchAccountsFailed(error));
          });
      })
      .catch(error => dispatch(requestIdentityFailed(error)));
  }
}

export function logOff() {
  return function(dispatch) {
    dispatch(resetUser());
    dispatch(resetIdentity());
  };
}

export function requestIdentity() {
  return {
    type: IDENTITY_REQUESTED
  };
}

export function setIdentity(json) {
  setTokens(json.access_token, json.refresh_token);
  return {
    type: IDENTITY_REQUEST_SUCCESS,
    payload: {
      date: new Date(),
      identity: json
    }
  };
}

export function requestIdentityFailed(error) {
  clearTokens();
  return {
    type: IDENTITY_REQUEST_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetIdentity() {
  clearTokens();
  return {
    type: IDENTITY_RESET,
  };
}
