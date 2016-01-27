import {setSelectedAccount} from './accountActions';
import {setSelectedProject} from './projectActions';
import {getProject} from './projectActionCreators';


export function switchAccount(acountKey) {
  return function(dispatch, getState) {
    dispatch(setSelectedAccount(acountKey));
    const state = getState();
    let projectKey = null;
    try {
      projectKey = state.getIn(['project', 'projectOptionsMap', acountKey]).toJS()[0].value;
    } catch(e) {}

    if(projectKey !== null) {
      const hasFetched = state.getIn(['project', 'projects']).has(projectKey);

      if(!hasFetched) {
        getProject(projectKey)(dispatch, getState);
      }
      dispatch(setSelectedProject(projectKey));
    }
  }
}
