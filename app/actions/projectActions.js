export const PROJECT_FETCHING = 'PROJECT_FETCHING';
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS';
export const PROJECT_FETCH_FAILED = 'PROJECT_FETCH_FAILED';
export const PROJECT_RESET = 'PROJECT_RESET';
export const PROJECT_SET_SELECTED = 'PROJECT_SET_SELECTED';


export function fetchingProject() {
  return {
    type: PROJECT_FETCHING,
  };
}

export function fetchProjectSuccess(key, json) {
  return {
    type: PROJECT_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      key: key,
      project: json,
    }
  };
}

export function fetchProjectFailed(error) {
  return {
    type: PROJECT_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}

export function setSelectedProject(key) {
  return {
    type: PROJECT_SET_SELECTED,
    payload: {
      key: key
    }
  };
}
