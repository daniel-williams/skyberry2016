import {toJS} from 'immutable';

import TokenService from '../services/TokenService';
import FetchService from '../services/FetchService';
import {clone, addSlug, toKeyMap, toNameValueMap} from '../utils/CollectionUtils';
import {
  fetchingIdentity,
  fetchIdentitySuccess,
  fetchIdentityFailed,
  resetIdentity,
} from '../actions/identityActions';
import {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
} from '../actions/userActions';
import {
  fetchingAccounts,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  setAccountMap,
  setAccountOptions,
} from '../actions/accountActions';
import {setProjectOptionsMap} from '../actions/projectActions';
import {changeAccount, changeProject} from '../actions/dashboardActionCreators';


export function recoverIndentity() {
  return function(dispatch, getState) {

    const refreshToken = TokenService.getRefreshToken();
    if(!refreshToken) return;

    dispatch(fetchingIdentity());
    return FetchService.refreshIdentity(refreshToken)
      .then(identity => {
        TokenService.setTokens(identity.access_token, identity.refresh_token);
        dispatch(fetchIdentitySuccess(identity));
        return identity.user_id;
      })
      .then(
        user_id => loadUserAndAccountData(user_id)(dispatch, getState),
        error => {
          TokenService.clearTokens();
          dispatch(fetchIdentityFailed(error));
        }
      );
  }
}

export function logOn(username, password) {
  return function(dispatch, getState) {

    dispatch(fetchingIdentity());
    FetchService.signIn(username, password)
      .then(identity => {
        TokenService.setTokens(identity.access_token, identity.refresh_token);
        dispatch(fetchIdentitySuccess(identity));
        return identity.user_id;
      })
      .then(
        user_id => loadUserAndAccountData(user_id)(dispatch, getState),
        error => {
          // TODO: return form errors
          TokenService.clearTokens();
          dispatch(fetchIdentityFailed(error));
        }
      );
  }
}

export function logOff() {
  return function(dispatch) {
    TokenService.clearTokens();
    dispatch(resetUser());
    dispatch(resetIdentity());
    dispatch(resetAccounts());
    dispatch(resetProject());
  };
}

export function dump() {
  return function(dispatch, getState) {
    console.log('App State:', getState().toJS());
  }
}


export default {
  recoverIndentity,
  logOn,
  logOff,
  dump,
}


function loadUserAndAccountData(user_id) {
  return function(dispatch, getState) {
    dispatch(fetchingUser());
    dispatch(fetchingAccounts());
    return Promise.all([
      FetchService.getUser(user_id),
      FetchService.getAccounts(user_id),
    ])
    .then(res => {
      const user = res[0];
      const accounts = res[1];
      dispatch(fetchUserSuccess(user));

      const accountMap = buildAccountOptionMap(accounts);
      const accountKeyMap = toKeyMap(accountMap, 'slug');
      dispatch(setAccountMap(accountKeyMap))
      const accountOptions = toNameValueMap(accountMap, 'name', 'slug');
      dispatch(setAccountOptions(accountOptions));

      if(accounts.length) {
        const projectOptionsMap = buildProjectOptionsMap(accountMap);
        dispatch(setProjectOptionsMap(projectOptionsMap));
      }
      dispatch(fetchAccountsSuccess(accounts));
    })
    .catch(error => {
      dispatch(fetchUserFailed(error));
      dispatch(fetchAccountsFailed(error));
    });
  }
};

function buildAccountOptionMap(accounts) {
  const copy = clone(accounts);
  return copy.reduce((accountMap, account) => {
    addSlug(account, 'name');
    const projects = account.projects.map(project => {
      addSlug(project, 'name');
      return project;
    });
    account.projects = toKeyMap(projects, 'slug');
    accountMap.push(account);
    return accountMap;
  }, []);
}

function buildProjectOptionsMap(accounts) {
  const copy = clone(accounts);
  const projectOptionsMap = accounts.reduce((accountMap, account) => {
    const projects = account.projects;
    accountMap[account.slug] = Object.keys(projects).map(key => {
      return {
        name: projects[key].name,
        value: account.slug + '/' + projects[key].slug
      };
    });
    return accountMap;
  }, {});
  return projectOptionsMap;
}
