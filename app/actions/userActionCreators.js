import * as userActions from './userActions';


export function fetchingUser() {
  return {
    type: userActions.FETCH_USER,
  };
}

export function fetchUserSuccess(json) {
  return {
    type: userActions.FETCH_USER_SUCCESS,
    payload: {
      date: new Date(),
      user: json
    }
  };
}

export function fetchUserFailed(error) {
  return {
    type: userActions.FETCH_USER_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetUser() {
  return {
    type: userActions.RESET_USER,
  }
}


export default {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
}
