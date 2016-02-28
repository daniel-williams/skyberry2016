import {toJS} from 'immutable';

import TokenService from '../services/TokenService';
import FetchService from '../services/FetchService';
import SkyberryFetch from '../services/SkyberryFetchService';

import {clone, toKeyMap, toNameValueMap} from '../utils/CollectionUtils';
import userActionCreators from '../actions/userActionCreators';
import accountActionCreators from '../actions/accountActionCreators';
import projectActionCreators from '../actions/projectActionCreators';
import reviewActionCreators from '../actions/reviewActionCreators';
import * as actions from './identityActions';


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
    return FetchService.signIn(username, password)
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
      )
      .catch(err=> {
        console.log('Catch', err);
      })
  }
}

export function logOff() {
  return function(dispatch) {
    TokenService.clearTokens();
    dispatch(userActionCreators.resetUser());
    dispatch(resetIdentity());
    dispatch(accountActionCreators.resetAccounts());
    dispatch(projectActionCreators.resetProjects());
    dispatch(reviewActionCreators.resetReviews());
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
    dispatch(userActionCreators.fetchingUser());
    dispatch(accountActionCreators.fetchAccounts());
    return Promise.all([
      SkyberryFetch.loadUser(user_id),
      SkyberryFetch.loadAccounts(user_id),
    ])
    .then(res => {
      const user = res[0];
      const accounts = res[1];
      const accountMap = buildAccountMap(accounts);
      const accountKeyMap = toKeyMap(accountMap, 'slug');
      const accountOptions = toNameValueMap(accountMap, 'name', 'slug');

      // TODO: should we combine these dispatches?
      dispatch(userActionCreators.fetchUserSuccess(user));
      dispatch(accountActionCreators.setAccountOptions(accountOptions));
      dispatch(accountActionCreators.setAccountMap(accountKeyMap));
      dispatch(accountActionCreators.fetchAccountsSuccess(accounts));

      if(accounts.length) {
        dispatch(projectActionCreators.setProjectDirectory(buildProjectDirectory(accounts)));
      }
    })
    .catch(error => {
      dispatch(userActionCreators.fetchUserFailed(error));
      dispatch(accountActionCreators.fetchAccountsFailed(error));
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
    type: actions.FETCHING_IDENTITY
  };
}

export function fetchIdentitySuccess(identity) {
  return {
    type: actions.FETCH_IDENTITY_SUCCESS,
    payload: {
      date: new Date(),
      identity: identity
    }
  };
}

export function fetchIdentityFailed(error) {
  return {
    type: actions.FETCH_IDENTITY_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}

export function resetIdentity() {
  return {
    type: actions.RESET_IDENTITY,
  };
}
