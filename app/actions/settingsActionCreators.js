import FetchService from '../services/FetchService';
import * as settingsActions from './settingsActions';


export function settingsUpdateEmail(formData) {
  return function(dispatch) {
    dispatch(updateEmail(formData));

    FetchService.postJson('/api/users/email', formData, true)
      .then((json) => dispatch(updateEmailSuccess(json)))
      .catch(error => dispatch(updateEmailFailed(error)));
  };
}

export function settingsUpdateUsername(formData) {
  return function(dispatch) {
    dispatch(updateUsername(formData));

    FetchService.postJson('/api/users/username', formData, true)
      .then((json) => dispatch(updateUsernameSuccess(json)))
      .catch(error => dispatch(updateUsernameFailed(error)));
  };
}

export function settingsUpdatePassword(formData) {
  return function(dispatch) {
    dispatch(updatePassword(formData));

    FetchService.postJson('/api/users/password', formData, true)
      .then((json) => dispatch(updatePasswordSuccess(json)))
      .catch(error => dispatch(updatePasswordFailed(error)));
  };
}



export default {
  settingsUpdateEmail,
  settingsUpdateUsername,
  settingsUpdatePassword,
}

function updateEmail(formData) {
  return {
    type: settingsActions.SETTINGS_UPDATE_EMAIL,
    payload: {
      newEmail: formData.email,
    },
  };
}

function updateEmailSuccess(json) {
  return {
    type: settingsActions.SETTINGS_UPDATE_EMAIL_SUCCESS,
    payload: {
      date: new Date(),
      email: json.payload.email,
    },
  };
}
function updateEmailFailed(error) {
  return {
    type: settingsActions.SETTINGS_UPDATE_EMAIL_FAILED,
    payload: {
      date: new Date(),
      error: error,
    },
  };
}


function updateUsername(formData) {
  return {
    type: settingsActions.SETTINGS_UPDATE_USERNAME,
    payload: {
      newUsername: formData.username,
    },
  };
}

function updateUsernameSuccess(json) {
  return {
    type: settingsActions.SETTINGS_UPDATE_USERNAME_SUCCESS,
    payload: {
      date: new Date(),
      username: json.payload.username,
    },
  };
}
function updateUsernameFailed(error) {
  return {
    type: settingsActions.SETTINGS_UPDATE_USERNAME_FAILED,
    payload: {
      date: new Date(),
      error: error,
    },
  };
}


function updatePassword(formData) {
  return {
    type: settingsActions.SETTINGS_UPDATE_PASSWORD,
    payload: {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    },
  };
}

function updatePasswordSuccess() {
  return {
    type: settingsActions.SETTINGS_UPDATE_PASSWORD_SUCCESS,
    payload: {
      date: new Date(),
    },
  };
}
function updatePasswordFailed(error) {
  return {
    type: settingsActions.SETTINGS_UPDATE_PASSWORD_FAILED,
    payload: {
      date: new Date(),
      error: error,
    },
  };
}
