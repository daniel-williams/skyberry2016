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


export function SignIn(username, password) {
  return fetch(
    constants.routes.token,
    authRequestOptions({username, password})
  )
  .then(checkStatus)
  .then(parseJSON)

}
export function GetUser(token, id) {
  return fetch(
    '/api/users/' + id,
    getApiRequestOptions(token)
  )
  .then(checkStatus)
  .then(parseJSON)
}
export function GetAccounts(token, id) {
  return fetch(
    '/api/users/' + id + '/accounts',
    getApiRequestOptions(token)
  )
  .then(checkStatus)
  .then(parseJSON)
}
