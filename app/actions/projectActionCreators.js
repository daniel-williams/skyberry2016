import FetchService from '../services/FetchService';
import {
  fetchingProject,
  fetchProjectSuccess,
  fetchProjectFailed,
} from './projectActions';



export function fetchProjectAsNeeded(compositeSlug) {
  return function(dispatch, getState) {
    const state = getState();
    const slugs = compositeSlug.split('/');
    let projectId = null;
    try {
      projectId = state.getIn(['account', 'accountMap', slugs[0], 'projects', slugs[1], 'id']);
    } catch(e) {}

    if(projectId) {
      const hasFetched = state.getIn(['project', 'projects']).has(compositeSlug);
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
