import {refreshIdentity} from '../services/FetchService';
import {setIdentity} from './identityActionCreators';


export function testRefreshToken(token) {
  return function(dispatch, getState) {
    console.log('TOKEN_REFRESH_REQUESTED');

    return refreshIdentity(token)
      .then(json => dispatch(setIdentity(json)))
      .catch(error => console.log('TOKEN_REFRESH_REQUEST_FAILED', error));
  }
}
