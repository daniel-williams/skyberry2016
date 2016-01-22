import fetch from 'isomorphic-fetch';

import constants from '../constants';
import {
  checkStatus,
  parseJSON,
  authRequestOptions,
  refreshRequestOptions,
  getApiRequestOptions,
  postApiRequestOptions,
} from '../utils/fetchUtils';


export function refreshIdentity(token) {
  return fetch(
    constants.routes.token,
    refreshRequestOptions(token)
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
export function getUser(token, id) {
  return fetch(
    '/api/users/' + id,
    getApiRequestOptions(token)
  )
  .then(checkStatus)
  .then(parseJSON)
}
export function getAccounts(token, id) {
  return fetch(
    '/api/users/' + id + '/accounts',
    getApiRequestOptions(token)
  )
  .then(checkStatus)
  .then(parseJSON)
}
export function getJson(route, token) {
  return fetch(
    route,
    getApiRequestOptions(token)
  )
  .then(checkStatus)
  .then(parseJSON)
}
export function postJson(route, token) {
  return fetch(
    route,
    postApiRequestOptions(token)
  )
  .then(checkStatus)
  .then(parseJSON)
}
