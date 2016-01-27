import FetchService from '../services/FetchService';
import {
  fetchingProject,
  fetchProjectSuccess,
  fetchProjectFailed,
  setSelectedProject,
} from './projectActions';




export function switchProject(id) {
  return function(dispatch, getState) {
    const hasFetched = getState().getIn(['project', 'projects']).has(id);

    if(!hasFetched) {
      getProject(id)(dispatch, getState);
    }
    dispatch(setSelectedProject(id));
  }
}


export function getProject(id) {
  return function(dispatch) {
    dispatch(fetchingProject());

    return FetchService.getProject(id)
      .then(project => {
        dispatch(fetchProjectSuccess(id, project));
        return Promise.resolve(project);
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error));
        return Promise.reject(error);
      });
  }
}
