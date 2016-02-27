import * as actions from './userActions';


export function fetchingUser() {
  return {
    type: actions.FETCH_USER,
  };
}

export function fetchUserSuccess(json) {
  return {
    type: actions.FETCH_USER_SUCCESS,
    payload: {
      date: new Date(),
      user: json
    }
  };
}

export function fetchUserFailed(error) {
  return {
    type: actions.FETCH_USER_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetUser() {
  return {
    type: actions.RESET_USER,
  }
}


export default {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
}
