import FetchService from '../services/FetchService';
import history from '../routes/history';

import * as projectActions from './projectActions';
import {mergeIncomingReviews} from './reviewActionCreators';


export function fetchProjectAsNeeded(compositeSlug) {
  return function(dispatch, getState) {
    const state = getState();
    const slugs = compositeSlug.split('/');
    let projectId = null;
    try {
      projectId = state.getIn(['project', 'projectDirectory', slugs[0], 'slugMap', slugs[1], 'id']);
    } catch(e) {}

    if(projectId) {
      const hasFetched = state.getIn(['project', 'projects']).has(compositeSlug);
      // TODO: determine when and where to check/break on fetch error
      if(!hasFetched) {
        loadProject(projectId, compositeSlug)(dispatch, getState);
      }
    }
  }
}

export function setProjectDirectory(projectDirectory) {
  return {
    type: projectActions.SET_PROJECT_DIRECTORY,
    payload: {
      projectDirectory: projectDirectory,
    }
  }
}

export function changeAccount(accountSlug) {
  return function(dispatch, getState) {
    let compositeSlug = null;
    try {
      compositeSlug = getState().getIn(['project', 'projectDirectory', accountSlug, 'options']).first().toJS().value;
    } catch(e) {}

    if(compositeSlug !== null) {
      changeProject(compositeSlug)(dispatch, getState);
    }
  }
}

export function changeProject(compositeSlug) {
  return function(dispatch, getState) {
    history.pushState(null, '/dashboard/projects/' + compositeSlug);
  };
}

export function resetProjects() {
  return {
    type: projectActions.RESET_PROJECTS,
  };
}


export default {
  fetchProjectAsNeeded,
  setProjectDirectory,
  changeAccount,
  changeProject,
  resetProjects,
}


// internal helper functions
function loadProject(projectId, compositeSlug) {
  return function(dispatch) {
    dispatch(fetchProject());

    return FetchService.loadProject(projectId)
      .then(project => {
        dispatch(mergeIncomingReviews(buildReviewMap(compositeSlug, project)));
        dispatch(fetchProjectSuccess(compositeSlug, project));
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error));
      });
  };
}
function fetchProject() {
  return {
    type: projectActions.FETCH_PROJECT,
  };
}
function fetchProjectSuccess(key, project) {
  return {
    type: projectActions.FETCH_PROJECT_SUCCESS,
    payload: {
      date: new Date(),
      key: key,
      project: project,
    }
  };
}
function fetchProjectFailed(error) {
  return {
    type: projectActions.FETCH_PROJECT_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}

function buildReviewMap(compositeSlug, project) {
  return project.reviews.reduce((reviewMap, review) => {
    reviewMap[compositeSlug + '/' + review.slug] = review;
    return reviewMap;
  }, {});
}
