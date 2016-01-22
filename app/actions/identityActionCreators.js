
import constants from '../constants';
import {
  refreshIdentity,
  signIn,
  getUser,
  getAccounts
} from '../services/FetchService';
import {
  requestUser,
  setUser,
  requestUserFailed,
  resetUser,
} from './userActionCreators';
import {
  IDENTITY_REQUESTED,
  IDENTITY_REQUEST_SUCCESS,
  IDENTITY_REQUEST_FAILED,
  IDENTITY_RESET,
} from '.';


export function recoverIndentity() {
  return function(dispatch, getState) {

    const token = getToken();
    if(!token) return;

    dispatch(requestIdentity());

    refreshIdentity(token)
      .then(identity => {
        dispatch(setIdentity(identity));

        const {access_token, userId} = identity;
        dispatch(requestUser());
        // dispatch(requestAccounts());

        Promise.all([
            getUser(access_token, userId),
            getAccounts(access_token, userId)
          ])
          .then(res => {
            dispatch(setUser(res[0]));
            // dispatch(setAccounts(res[1]));
          })
          .catch(error => {
            dispatch(requestUserFailed(error));
            // dispatch(requestAccountsFailed(error));
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

        const {access_token, userId} = identity;
        dispatch(requestUser());
        // dispatch(requestAccounts());

        Promise.all([
            getUser(access_token, userId),
            getAccounts(access_token, userId)
          ])
          .then(res => {
            dispatch(setUser(res[0]));
            // dispatch(setAccounts(res[1]));
          })
          .catch(error => {
            dispatch(requestUserFailed(error));
            // dispatch(requestAccountsFailed(error));
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
  storeToken(json.refresh_token);
  return {
    type: IDENTITY_REQUEST_SUCCESS,
    payload: {
      date: new Date(),
      identity: json
    }
  };
}

export function requestIdentityFailed(error) {
  return {
    type: IDENTITY_REQUEST_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetIdentity() {
  clearToken();
  return {
    type: IDENTITY_RESET,
  };
}



function hasStorage() {
  return window && typeof(window.localStorage) !== 'undefined';
}
function storeToken(token) {
  if(hasStorage()) {
    window.localStorage.setItem('token', token);
  }
}
function clearToken() {
  if(hasStorage()) {
    window.localStorage.removeItem('token');
  }
}
export function getToken() {
  return hasStorage() ? window.localStorage.getItem('token') : undefined;
}
