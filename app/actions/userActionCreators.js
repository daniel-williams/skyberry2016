import * as userActions from './userActions';


export function fetchingUser() {
  return {
    type: userActions.USER_FETCHING,
  };
}

export function fetchUserSuccess(json) {
  return {
    type: userActions.USER_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      user: json
    }
  };
}

export function fetchUserFailed(error) {
  return {
    type: userActions.USER_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetUser() {
  return {
    type: userActions.USER_RESET,
  }
}


export default {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
}
