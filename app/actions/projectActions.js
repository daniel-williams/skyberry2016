export const PROJECT_FETCHING = 'PROJECT_FETCHING';
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS';
export const PROJECT_FETCH_FAILED = 'PROJECT_FETCH_FAILED';
export const PROJECT_RESET = 'PROJECT_RESET';
export const PROJECT_SET_SELECTED = 'PROJECT_SET_SELECTED';
export const SET_PROJECT_OPTIONS_MAP = 'SET_PROJECT_OPTIONS_MAP';


export function fetchingProject() {
  return {
    type: PROJECT_FETCHING,
  };
}

export function fetchProjectSuccess(key, project) {
  return {
    type: PROJECT_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      key: key,
      project: project,
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

export function resetProject() {
  return {
    type: PROJECT_RESET,
  };
}

export function setSelectedProject(key) {
  return {
    type: PROJECT_SET_SELECTED,
    payload: {
      key: key,
    }
  };
}

export function setProjectOptionsMap(projectOptionsMap) {
  return {
    type: SET_PROJECT_OPTIONS_MAP,
    payload: {
      projectOptionsMap: projectOptionsMap,
    }
  }
}


export default {
  fetchingProject,
  fetchProjectSuccess,
  fetchProjectFailed,
  resetProject,
  setSelectedProject,
  setProjectOptionsMap,
}
