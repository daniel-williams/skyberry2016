import * as actions from './actions';


export function showChangeEmail() {
  return {
    type: actions.CHANGE_EMAIL_SHOW
  };
}
export function hideChangeEmail() {
  return {
    type: actions.CHANGE_EMAIL_HIDE
  };
}


export function showChangePassword() {
  return {
    type: actions.CHANGE_PASSWORD_SHOW
  };
}
export function hideChangePassword() {
  return {
    type: actions.CHANGE_PASSWORD_HIDE
  };
}

export function showChangeUsername() {
  return {
    type: actions.CHANGE_USERNAME_SHOW
  };
}
export function hideChangeUsername() {
  return {
    type: actions.CHANGE_USERNAME_HIDE
  };
}

export default {
  showChangeEmail,
  hideChangeEmail,
  showChangePassword,
  hideChangePassword,
  showChangeUsername,
  hideChangeUsername,
}
