import fetch from 'isomorphic-fetch';

import constants from '../constants';
import {getAccessToken, getRefreshToken} from './TokenService';
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
    getApiRequestOptions(withCredentials === true && getAccessToken())
  )
  .then(checkStatus)
  .then(parseJSON)
}
export function postJson(route, payload, withCredentials = false) {
  return fetch(
    route,
    postApiRequestOptions(payload, withCredentials === true && getAccessToken())
  )
  .then(checkStatus)
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
    refreshRequestOptions(getRefreshToken())
  )
  .then(checkStatus)
  .then(parseJSON)
}

// TODO: reuse getJson with credentials
export function getUser(id) {
  return fetch(
    '/api/users/' + id,
    getApiRequestOptions(getAccessToken())
  )
  .then(checkStatus)
  .then(parseJSON)
}
export function getAccounts(id) {
  return fetch(
    '/api/users/' + id + '/accounts',
    getApiRequestOptions(getAccessToken())
  )
  .then(checkStatus)
  .then(parseJSON);
}
export function getProject(id) {
  return fetch(
    '/api/projects/' + id,
    getApiRequestOptions(getAccessToken())
  )
  .then(checkStatus)
  .then(parseJSON);
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
