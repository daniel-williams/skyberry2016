
import {
  USER_FETCHING,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILED,
  USER_RESET,
} from '.';


export function fetchingUser() {
  return {
    type: USER_FETCHING,
  };
}

export function fetchUserSuccess(json) {
  return {
    type: USER_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      user: json
    }
  };
}

export function fetchUserFailed(error) {
  return {
    type: USER_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetUser() {
  return {
    type: USER_RESET,
  }
}
