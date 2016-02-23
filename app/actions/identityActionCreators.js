import {toJS} from 'immutable';

import TokenService from '../services/TokenService';
import FetchService from '../services/FetchService';
import {clone, addSlug, toKeyMap, toNameValueMap} from '../utils/CollectionUtils';
import {
  fetchingUser,
  fetchUserSuccess,
  fetchUserFailed,
  resetUser,
} from '../actions/userActionCreators';
import {
  fetchAccounts,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  resetAccounts,
  setAccountMap,
  setAccountOptions,
} from '../actions/accountActionCreators';
import {setProjectDirectory} from '../actions/projectActionCreators';
import {changeAccount, changeProject} from '../actions/dashboardActionCreators';
import * as identityActions from './identityActions';


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
          TokenService.clearTokens();
          error.errors = {'error':'The username or password are incorrect.'}
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
  };
}

export function dump() {
  return function(dispatch, getState) {
    console.log('App State:', getState().toJS());
  }
}


export default {
  recoverIndentity,
  resetIdentity,
  logOn,
  logOff,

  dump,
}


function loadUserAndAccountData(user_id) {
  return function(dispatch, getState) {
    dispatch(fetchingUser());
    dispatch(fetchAccounts());
    return Promise.all([
      FetchService.loadUser(user_id),
      FetchService.loadAccounts(user_id),
    ])
    .then(res => {
      const user = res[0];
      const accounts = res[1];
      const accountMap = buildAccountMap(accounts);
      const accountKeyMap = toKeyMap(accountMap, 'slug');
      const accountOptions = toNameValueMap(accountMap, 'name', 'slug');

      // TODO: shouldn't we combine these dispatches?
      dispatch(fetchUserSuccess(user));
      dispatch(setAccountOptions(accountOptions));
      dispatch(setAccountMap(accountKeyMap));
      dispatch(fetchAccountsSuccess(accounts));

      if(accounts.length) {
        dispatch(setProjectDirectory(buildProjectDirectory(accounts)));
      }
    })
    .catch(error => {
      dispatch(fetchUserFailed(error));
      dispatch(fetchAccountsFailed(error));
    });
  }
};

function buildAccountMap(accounts) {
  return clone(accounts).reduce((accum, account) => {
    delete account.projects;
    account.loaded = false;
    accum.push(account);
    return accum;
  }, []);
}

function buildProjectDirectory(accounts) {
  return clone(accounts).reduce((projectDirectory, account) => {
    projectDirectory[account.slug] = {};
    projectDirectory[account.slug].slugMap = toKeyMap(account.projects, 'slug');
    const slugMap = projectDirectory[account.slug].slugMap;
    projectDirectory[account.slug].options = Object.keys(slugMap).map(key => {
      return {
        name: slugMap[key].name,
        value: account.slug + '/' + slugMap[key].slug
      };
    });
    return projectDirectory;
  }, {});
}

export function fetchingIdentity() {
  return {
    type: identityActions.FETCH_IDENTITY
  };
}

export function fetchIdentitySuccess(identity) {
  return {
    type: identityActions.FETCH_IDENTITY_SUCCESS,
    payload: {
      date: new Date(),
      identity: identity
    }
  };
}

export function fetchIdentityFailed(error) {
  return {
    type: identityActions.FETCH_IDENTITY_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetIdentity() {
  return {
    type: identityActions.RESET_IDENTITY,
  };
}
