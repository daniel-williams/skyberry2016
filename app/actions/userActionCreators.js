
import {
  USER_REQUESTED,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED,
  USER_RESET,
} from '.';


export function requestUser() {
  return {
    type: USER_REQUESTED,
  };
}

export function setUser(json) {
  return {
    type: USER_REQUEST_SUCCESS,
    payload: {
      date: new Date(),
      user: json
    }
  };
}

export function requestUserFailed(error) {
  return {
    type: USER_REQUEST_FAILED,
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
