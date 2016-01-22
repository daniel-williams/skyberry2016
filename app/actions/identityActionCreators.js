
import constants from '../constants';
import {
  SignIn,
  GetUser,
  GetAccounts
} from '../services/OAuthService';
import {
  IDENTITY_REQUESTED,
  IDENTITY_REQUEST_SUCCESS,
  IDENTITY_REQUEST_FAILED,
  IDENTITY_RESET,

  USER_REQUESTED,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED,
  USER_RESET,
} from '.';


export function Login(formData) {
  return function(dispatch, getState) {

    const {username, password} = formData;
    dispatch(requestIdentity());

    SignIn(username, password)
      .then(identity => {
        dispatch(setIdentity(identity));

        const {access_token, userId} = identity;
        dispatch(requestUser());
        // dispatch(requestAccounts());

        Promise.all([
            GetUser(access_token, userId),
            GetAccounts(access_token, userId)
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

export function Logout() {
  return function(dispatch) {
    dispatch(resetUser());
    dispatch(resetIdentity());
  };
}

function requestIdentity() {
  return {
    type: IDENTITY_REQUESTED
  };
}
function requestUser() {
  return {
    type: USER_REQUESTED,
  };
}


function setIdentity(json) {
  // localStorage.setItem('token', json.refresh_token);
  return {
    type: IDENTITY_REQUEST_SUCCESS,
    payload: {
      date: new Date(),
      identity: json
    }
  };
}
function setUser(json) {
  return {
    type: USER_REQUEST_SUCCESS,
    payload: {
      date: new Date(),
      user: json
    }
  };
}


function requestIdentityFailed(error) {
  // localStorage.removeItem('token');
  return {
    type: IDENTITY_REQUEST_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}
function requestUserFailed(error) {
  return {
    type: USER_REQUEST_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}


function resetIdentity() {
  // localStorage.removeItem('token');
  return {
    type: IDENTITY_RESET,
  };
}
function resetUser() {
  return {
    type: USER_RESET,
  }
}
