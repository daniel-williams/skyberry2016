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
  resetAccounts,
  setAccountMap,
  setAccountOptions,
} from '../actions/accountActions';
import {setProjectLookupData} from '../actions/projectActions';
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
      const accountMap = buildAccountOptions(accounts);
      const accountKeyMap = toKeyMap(accountMap, 'slug');
      const accountOptions = toNameValueMap(accountMap, 'name', 'slug');

      // TODO: shouldn't we combine these dispatches?
      dispatch(fetchUserSuccess(user));
      dispatch(setAccountOptions(accountOptions));
      dispatch(setAccountMap(accountKeyMap));
      dispatch(fetchAccountsSuccess(accounts));

      if(accounts.length) {
        dispatch(setProjectLookupData(buildProjectLookupData(accounts)));
      }
    })
    .catch(error => {
      dispatch(fetchUserFailed(error));
      dispatch(fetchAccountsFailed(error));
    });
  }
};

function buildAccountOptions(accounts) {
  return clone(accounts).reduce((accountOptions, account) => {
    delete account.projects;
    accountOptions.push(account);
    return accountOptions;
  }, []);
}

function buildProjectLookupData(accounts) {
  return clone(accounts).reduce((projectLookup, account) => {
    projectLookup[account.slug] = {};
    projectLookup[account.slug].slugMap = toKeyMap(account.projects, 'slug');
    const slugMap = projectLookup[account.slug].slugMap;
    projectLookup[account.slug].options = Object.keys(slugMap).map(key => {
      return {
        name: slugMap[key].name,
        value: account.slug + '/' + slugMap[key].slug
      };
    });
    return projectLookup;
  }, {});
}
