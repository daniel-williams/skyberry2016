import {toJS} from 'immutable';
import TokenService from '../services/TokenService';
import FetchService from '../services/FetchService';

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
  setSelectedAccount,
} from '../actions/accountActions';
import {
  fetchingProject,
  fetchProjectSuccess,
  fetchProjectFailed,
  resetProject,
  setProjectOptionsMap,
  setSelectedProject,
} from '../actions/projectActions';
import {
  switchProject,
} from '../actions/projectActionCreators';


export function recoverIndentity() {
  return function(dispatch) {

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
        user_id => loadUserAndAccountData(user_id)(dispatch),
        error => {
          console.log('ident', error);
          TokenService.clearTokens();
          dispatch(fetchIdentityFailed(error));
          // return Promise.reject(error);
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
        user_id => loadUserAndAccountData(user_id)(dispatch),
        error => {
          // TODO: return form errors
          TokenService.clearTokens();
          dispatch(fetchIdentityFailed(error));
          return Promise.reject(error);
        }
      );
  }
}

export function loadUserAndAccountData(user_id) {
  return function(dispatch) {
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
      dispatch(fetchAccountsSuccess(accounts));
      if(accounts.length) {
        dispatch(setSelectedAccount(accounts[0].id));
        dispatch(setProjectOptionsMap(buildProjectOptionsMap(accounts)));
        if(accounts[0].projects.length) {
          return accounts[0].projects[0];
        }
      }
      return {};
    })
    .then(
      project => loadProjectData(project.id)(dispatch),
      error => {
        dispatch(fetchUserFailed(error));
        dispatch(fetchAccountsFailed(error));
        return Promise.reject(error);
      }
    )
  }
};


export function loadProjectData(id) {
  return function(dispatch) {
    if(!id) {
      return Promise.reject(new Error('No project id was provided.'));
    }
    dispatch(fetchingProject());
    return FetchService.getProject(id)
      .then(project => {
        dispatch(fetchProjectSuccess(id, project));
        dispatch(setSelectedProject(id));
        return Promise.resolve(project);
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error))
        return Promise.reject(error);
      });
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


function buildProjectOptionsMap(accounts) {
  const projectOptionsMap = accounts.reduce((accountMap, account) => {
    accountMap[account.id] = account.projects.reduce((projectOptions, project) => {
      projectOptions.push({
        name: project.name,
        value: project.id,
      });
      return projectOptions;
    }, []);
    return accountMap;
  }, {})
  return projectOptionsMap;
}
