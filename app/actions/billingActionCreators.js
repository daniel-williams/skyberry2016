import history from '../routes/history';


export function changeAccount(accountSlug) {
  return function(dispatch, getState) {
    history.pushState(null, '/dashboard/billing/' + accountSlug);
  }
}


export default {
  changeAccount,
}
