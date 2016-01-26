export const USER_FETCHING = 'USER_FETCHING';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';
export const USER_RESET = 'USER_RESET';


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


export default {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
}
