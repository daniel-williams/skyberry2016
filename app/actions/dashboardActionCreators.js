import FetchService from '../services/FetchService';
import {setSelectedAccount} from './accountActions';
import {
  fetchingProject,
  fetchProjectSuccess,
  fetchProjectFailed,
  setSelectedProject
} from './projectActions';


export function changeAccount(accountSlug) {
  return function(dispatch, getState) {
    dispatch(setSelectedAccount(accountSlug));
    const state = getState();
    let compositeSlug = null;
    try {
      compositeSlug = state.getIn(['project', 'projectOptionsMap', accountSlug]).toJS()[0].value;
    } catch(e) {}

    if(compositeSlug !== null) {
      return changeProject(compositeSlug)(dispatch, getState);
    } else {
      return Promise.resolve();
    }
  }
}

export function changeProject(compositeSlug) {
  return function(dispatch, getState) {
    const state = getState();
    const slugs = compositeSlug.split('/');
    let projectId = null;
    try {
      projectId = state.getIn(['account', 'accountMap', slugs[0], 'projects', slugs[1], 'id']);
    } catch(e) {}

    if(projectId) {
      dispatch(setSelectedProject(compositeSlug));
      const hasFetched = state.getIn(['project', 'projects']).has(compositeSlug);
      if(!hasFetched) {
        return getProject(projectId, compositeSlug)(dispatch, getState);
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.reject(new Error(`Project id was not found @ ${slugs[0]}, ${slugs[1]}`));
    }

  }
}

export function getProject(projectId, compositeSlug) {
  return function(dispatch) {
    dispatch(fetchingProject());

    return FetchService.getProject(projectId)
      .then(project => {
        dispatch(fetchProjectSuccess(compositeSlug, project));
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error));
      });
  }
}
