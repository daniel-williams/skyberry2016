import fetch from 'isomorphic-fetch';

import constants from '../constants';
import store from '../store';
import TokenService from './TokenService';
import {resetUser} from '../actions/userActions';
import {resetIdentity} from '../actions/identityActions';
import {resetAccounts} from '../actions/accountActions';
import {projectActions} from '../actions/projectActions';
import {
  checkStatus,
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
  .then(checkStatus)
  .catch(error => {
    if(error.code === 401) {
      console.log('401 -> logOff');
      logOff();
    }
    return Promise.reject(error);
  })
  .then(parseJSON)
}
export function postJson(route, payload, withCredentials = false) {
  return fetch(
    route,
    postApiRequestOptions(payload, withCredentials === true && TokenService.getAccessToken())
  )
  .then(checkStatus)
  .catch(error => {
    if(error.code === 401) {
      logOff();
    }
    return Promise.reject(error);
  })
  .then(parseJSON)
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

// TODO: reuse getJson with credentials
export function getUser(id) {
  return getJson('/api/users/' + id, true);
}
export function getAccounts(id) {
  return getJson('/api/users/' + id + '/accounts', true);
}
export function getProject(id) {
  return getJson('/api/projects/' + id, true);
}

export default {
  getJson,
  postJson,
  refreshIdentity,
  signIn,
  getUser,
  getAccounts,
  getProject,
}




export function logOff() {
  TokenService.clearTokens();
  store.dispatch(resetUser());
  store.dispatch(resetIdentity());
  store.dispatch(resetAccounts());
}
