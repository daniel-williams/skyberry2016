import fetch from 'isomorphic-fetch';

import constants from '../constants';
import store from '../store';
import TokenService from './TokenService';
import {resetUser} from '../actions/userActionCreators';
import {resetIdentity} from '../actions/identityActionCreators';
import {resetAccounts} from '../actions/accountActionCreators';
import {resetProjects} from '../actions/projectActionCreators';
import {
  checkStatus,
  checkSkyApiStatus,
  parseJSON,
  authRequestOptions,
  refreshRequestOptions,
  getApiRequestOptions,
  postApiRequestOptions,
} from '../utils/fetchUtils';


export function getJson(route, withCredentials = false) {
  return fetch(
    route,
    getApiRequestOptions(withCredentials === true && TokenService.getAccessToken())
  )
  .then(checkSkyApiStatus)
  .catch(error => {
    if(error.status === 401) {
      logOff();
    }
    // throw error;
    return Promise.reject(error);
  })
}
export function postJson(route, payload, withCredentials = false) {
  return fetch(
    route,
    postApiRequestOptions(payload, withCredentials === true && TokenService.getAccessToken())
  )
  .then(checkSkyApiStatus)
  .catch(error => {
    if(error.status === 401) {
      logOff();
    }
    // throw error;
    return Promise.reject(error);
  })
}


export function signIn(username, password) {
  return fetch(
    constants.routes.token,
    authRequestOptions({username, password})
  )
  .then(checkStatus)
  .then(parseJSON)
}
export function refreshIdentity() {
  return fetch(
    constants.routes.token,
    refreshRequestOptions(TokenService.getRefreshToken())
  )
  .then(checkStatus)
  .then(parseJSON)
}

export function loadUser(id) {
  return getJson('/api/users/' + id, true);
}
export function loadAccounts(id) {
  return getJson('/api/users/' + id + '/accounts', true);
}
export function loadAccount(id) {
  return getJson('/api/accounts/' + id, true);
}
export function loadProject(id) {
  return getJson('/api/projects/' + id, true);
}

export default {
  getJson,
  postJson,
  refreshIdentity,
  signIn,
  loadUser,
  loadAccounts,
  loadAccount,
  loadProject,
}




export function logOff() {
  TokenService.clearTokens();
  store.dispatch(resetUser());
  store.dispatch(resetIdentity());
  store.dispatch(resetAccounts());
  store.dispatch(resetProjects());
}
