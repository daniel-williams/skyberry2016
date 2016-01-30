import {setSelectedAccount} from './accountActions';
import {setSelectedProject} from './projectActions';
import history from '../routes/history';


export function changeAccount(accountSlug) {
  return function(dispatch, getState) {
    dispatch(setSelectedAccount(accountSlug));
    let compositeSlug = null;
    try {
      compositeSlug = getState().getIn(['project', 'projectOptionsMap', accountSlug]).toJS()[0].value;
    } catch(e) {}

    if(compositeSlug !== null) {
      changeProject(compositeSlug)(dispatch, getState);
    }
  }
}

export function changeProject(compositeSlug) {
  return function(dispatch, getState) {
    dispatch(setSelectedProject(compositeSlug));
    history.pushState(null, '/dashboard/projects/' + compositeSlug);
  };
}
