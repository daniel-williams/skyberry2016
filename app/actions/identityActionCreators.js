import fetch from 'isomorphic-fetch';

import constants from '../constants';
import {
  checkStatus,
  parseJSON,
  createFormPost,
  createJsonPost,
} from './fetch-helpers';
import {
  IDENTITY_REQUESTED,
  IDENTITY_REQUEST_SUCCESS,
  IDENTITY_REQUEST_FAILED,
  IDENTITY_REFRESH,
  IDENTITY_REFRESH_SUCCESS,
  IDENTITY_REFRESH_FAILED,
  IDENTITY_RESET,
} from '.';


export function Login(formData) {
  return function(dispatch, getState) {
    dispatch(requestIdentity());

    const {username, password} = formData;
    fetch(
      constants.routes.token,
      createFormPost({username, password, 'grant_type': 'password'})
    )
    .then(checkStatus)
    .then(parseJSON)
    .then(json => dispatch(setIdentity(json)))
    .catch(error => dispatch(requestIdentityFailed(error)));
  }
}
export function Logout() {
  return function(dispatch) {
    dispatch(resetIdentity());
  };
}
export function RecoverIdentity(token) {
  return function(dispatch, getState) {
    dispatch(requestIdentity());

    fetch(
      constants.routes.token,
      createPostOptions({
        'grant_type': 'refresh_token',
        'refresh_token': token,
      })
    )
    .then(checkStatus)
    .then(parseJSON)
    .then(json => dispatch(setIdentity(json)))
    .catch(error => dispatch(requestIdentityFailed(error)));
  }
}


function requestIdentity() {
  return {
    type: IDENTITY_REQUESTED
  };
}
function setIdentity(json) {
  // localStorage.setItem('token', json.refresh_token);
  return {
    type: IDENTITY_REQUEST_SUCCESS,
    payload: {
      lastRequestDate: new Date(),
      accessToken: json.access_token,
      refreshToken: json.refresh_token,
      expireDate: new Date(json['.expires']),
      id: json.userId,
      username: json.userName,
    }
  };
}
function resetIdentity() {
  // localStorage.removeItem('token');
  return {
    type: IDENTITY_RESET,
  };
}
function requestIdentityFailed(error) {
  // localStorage.removeItem('token');
  return {
    type: IDENTITY_REQUEST_FAILED,
    payload: {
      lastRequestDate: new Date(),
      lastRequestError: error,
    }
  };
}
