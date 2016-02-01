import FetchService from '../services/FetchService';
import {setSelectedAccount} from './accountActions';
import history from '../routes/history';
import {addSlug} from '../utils/CollectionUtils';

import {
  fetchingProject,
  fetchProjectSuccess,
  fetchProjectFailed,
  setSelectedProject
} from './projectActions';


export function changeAccount(accountSlug) {
  return function(dispatch, getState) {
    dispatch(setSelectedAccount(accountSlug));
    let compositeSlug = null;
    try {
      compositeSlug = getState().getIn(['project', 'projectLookup', accountSlug, 'options']).first().toJS().value;
    } catch(e) {}

    if(compositeSlug !== null) {
      changeProject(compositeSlug)(dispatch, getState);
    }
  }
}

export function changeProject(compositeSlug) {
  return function(dispatch, getState) {
    dispatch(setSelectedProject(compositeSlug));
    // fetchProjectAsNeeded(compositeSlug)(dispatch, getState);
    history.pushState(null, '/dashboard/projects/' + compositeSlug);
  };
}


export function fetchProjectAsNeeded(compositeSlug) {
  return function(dispatch, getState) {
    const state = getState();
    const slugs = compositeSlug.split('/');
    let projectId = null;
    try {
      projectId = state.getIn(['project', 'projectLookup', slugs[0], 'slugMap', slugs[1], 'id']);
    } catch(e) {}

    if(projectId) {
      const hasFetched = state.getIn(['project', 'projects']).has(compositeSlug);
      // TODO: determine when and where to check/break on fetch error
      if(!hasFetched) {
        getProject(projectId, compositeSlug)(dispatch, getState);
      }
    }
  }
}

function getProject(projectId, compositeSlug) {
  return function(dispatch) {
    dispatch(fetchingProject());

    return FetchService.getProject(projectId)
      .then(project => {
        dispatch(fetchProjectSuccess(compositeSlug, project));
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error));
      });
  };
}
