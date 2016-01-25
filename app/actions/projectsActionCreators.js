import {getJson} from '../services/FetchService';
import {
  PROJECT_FETCHING,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_FAILED,
  PROJECT_SET_SELECTED,
} from '.';


export function switchProject(key) {
  return function(dispatch, getState) {
    const hasCollection = getState().getIn(['projects', 'items']).has(key);

    if(!hasCollection) {
      fetchProject(key)(dispatch, getState);
    }
    dispatch(setSelectedProject(key));
  }
}

export function fetchProject(key) {
  return function(dispatch) {
    dispatch(fetchingProject());

    getJson('/api/project/' + key)
      .then(json => dispatch(fetchProjectSuccess(key, json)))
      .catch(error => dispatch(fetchProjectFailed(error)));
  }
}


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
