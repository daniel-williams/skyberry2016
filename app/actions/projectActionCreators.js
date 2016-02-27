import SkyberryFetch from '../services/SkyberryFetchService';
import history from '../routes/history';

import reviewActionCreators from './reviewActionCreators';
import * as actions from './projectActions';


export function fetchAsNeeded(compositeSlug) {
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
    type: actions.SET_PROJECT_DIRECTORY,
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
    type: actions.RESET_PROJECTS,
  };
}


export default {
  fetchAsNeeded,
  setProjectDirectory,
  changeAccount,
  changeProject,
  resetProjects,
}


// private creators
function loadProject(projectId, compositeSlug) {
  return function(dispatch) {
    dispatch(fetchingProject());

    return SkyberryFetch.loadProject(projectId)
      .then(project => {
        dispatch(reviewActionCreators.mergeIncomingReviews(buildReviewMap(compositeSlug, project)));
        dispatch(fetchProjectSuccess(compositeSlug, project));
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error));
      });
  };
}


// internal helpers
function fetchingProject() {
  return {
    type: actions.FETCHING_PROJECT,
  };
}
function fetchProjectSuccess(key, project) {
  return {
    type: actions.FETCH_PROJECT_SUCCESS,
    payload: {
      date: new Date(),
      key: key,
      project: project,
    }
  };
}
function fetchProjectFailed(error) {
  return {
    type: actions.FETCH_PROJECT_FAILED,
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
