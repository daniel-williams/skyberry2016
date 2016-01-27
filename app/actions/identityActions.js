export const IDENTITY_FETCHING = 'IDENTITY_FETCHING';
export const IDENTITY_FETCH_SUCCESS = 'IDENTITY_FETCH_SUCCESS';
export const IDENTITY_FETCH_FAILED = 'IDENTITY_FETCH_FAILED';
export const IDENTITY_RESET = 'IDENTITY_RESET';


export function fetchingIdentity() {
  return {
    type: IDENTITY_FETCHING
  };
}

export function fetchIdentitySuccess(identity) {
  return {
    type: IDENTITY_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      identity: identity
    }
  };
}

export function fetchIdentityFailed(error) {
  return {
    type: IDENTITY_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetIdentity() {
  return {
    type: IDENTITY_RESET,
  };
}


export default {
  fetchingIdentity,
  fetchIdentitySuccess,
  fetchIdentityFailed,
  resetIdentity,
}
