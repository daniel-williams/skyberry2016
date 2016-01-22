import fetch from 'isomorphic-fetch';

import constants from '../constants';
import {
  checkStatus,
  parseJSON,
  createRefreshRequestOptions,
} from './fetch-helpers';

import {IDENTITY_REQUEST_SUCCESS} from '.';
import {
  TOKEN_REFRESH_REQUESTED,
  TOKEN_REFRESH_REQUEST_SUCCESS,
  TOKEN_REFRESH_REQUEST_FAILED,
  TOKEN_ACCESS_REQUESTED,
  TOKEN_ACCESS_REQUESTED_SUCCESS,
  TOKEN_ACCESS_REQUESTED_FAILED,
} from './testingActions';


export function testRefreshToken(token) {
  return function(dispatch, getState) {
    console.log('TOKEN_REFRESH_REQUESTED');

    return fetch(
      constants.routes.token,
      createRefreshRequestOptions(token)
    )
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      dispatch({
        type: IDENTITY_REQUEST_SUCCESS,
        payload: {
          date: new Date(),
          identity: json
        }
      });
    })
    .catch(error => {
      console.log('TOKEN_REFRESH_REQUEST_FAILED', error);
    });
  }
}
