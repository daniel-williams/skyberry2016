import {setSelectedAccount} from './accountActions';
import history from '../routes/history';


export function changeAccount(accountSlug) {
  return function(dispatch, getState) {
    dispatch(setSelectedAccount(accountSlug));
    history.pushState(null, '/dashboard/billing/' + accountSlug);
  }
}
