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
} from '../actions/accountActions';
import {
  fetchingProject,
  fetchProjectSuccess,
  fetchProjectFailed,
  resetProject,
} from '../actions/projectActions';

export function recoverIndentity() {
  return function(dispatch) {

    const refreshToken = TokenService.getRefreshToken();
    if(!refreshToken) return;

    dispatch(fetchingIdentity());
    return FetchService.refreshIdentity(refreshToken)
      .then(identity => {
        TokenService.setTokens(identity.access_token, identity.refresh_token);
        dispatch(fetchIdentitySuccess(identity));
        return identity.userId;
      })
      .then(
        userId => loadUserAndAccountData(userId)(dispatch),
        error => {
          TokenService.clearTokens();
          dispatch(fetchIdentityFailed(error));
          return Promise.reject(error);
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
        return identity.userId;
      })
      .then(
        userId => loadUserAndAccountData(userId)(dispatch),
        error => {
          // TODO: return form errors
          TokenService.clearTokens();
          dispatch(fetchIdentityFailed(error));
          return Promise.reject(error);
        }
      );
  }
}

export function loadUserAndAccountData(userId) {
  return function(dispatch) {
    dispatch(fetchingUser());
    dispatch(fetchingAccounts());
    return Promise.all([
      FetchService.getUser(userId),
      FetchService.getAccounts(userId),
    ])
    .then(res => {
      dispatch(fetchUserSuccess(res[0]));
      dispatch(fetchAccountsSuccess(res[1]));
      // TODO: dispatch projectOptions
      // TODO: dispatch fetchProject
      return Promise.resolve(res);
    })
    .catch(error => {
      dispatch(fetchUserFailed(error));
      dispatch(fetchAccountsFailed(error));
      return Promise.reject(error);
    });
  }
};


export function loadProjectData(projectId) {
  return function(dispatch) {
    dispatch(fetchingProject());
    return FetchService.getProject(projectId)
      .then(project => {
        dispatch(fetchProjectSuccess(project));
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


export default {
  recoverIndentity,
  logOn,
  logOff,
}
