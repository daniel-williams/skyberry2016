import {setSelectedAccount} from './accountActions';
import {setSelectedProject} from './projectActions';
import {getProject} from './projectActionCreators';


export function switchAccount(accountId) {
  return function(dispatch, getState) {
    dispatch(setSelectedAccount(accountId));
    const state = getState();
    let projectId = null;
    try {
      projectId = state.getIn(['project', 'projectOptionsMap', accountId]).toJS()[0].value;
    } catch(e) {}

    if(projectId !== null) {
      const hasFetched = state.getIn(['project', 'projects']).has(projectId);

      if(!hasFetched) {
        getProject(projectId)(dispatch, getState);
      }
      dispatch(setSelectedProject(projectId));
    }
  }
}
