import FetchService from '../services/FetchService';
import {AddSlug} from '../utils/CollectionUtils';
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
      .then(res => {
        const project = AddSlug(res);
        dispatch(fetchProjectSuccess(id, project));
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error));
      });
  }
}
