export const IDENTITY_REQUESTED = 'IDENTITY_REQUESTED';
export const IDENTITY_REQUEST_SUCCESS = 'IDENTITY_REQUEST_SUCCESS';
export const IDENTITY_REQUEST_FAILED = 'IDENTITY_REQUEST_FAILED';
export const IDENTITY_RESET = 'IDENTITY_RESET';


export function fetchingIdentity() {
  return {
    type: IDENTITY_REQUESTED
  };
}

export function fetchIdentitySuccess(json) {
  return {
    type: IDENTITY_REQUEST_SUCCESS,
    payload: {
      date: new Date(),
      identity: json
    }
  };
}

export function fetchIdentityFailed(error) {
  return {
    type: IDENTITY_REQUEST_FAILED,
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
