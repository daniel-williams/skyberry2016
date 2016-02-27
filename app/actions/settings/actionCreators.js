import * as actions from './actions';


export function showChangeEmail() {
  return {
    type: actions.SHOW_CHANGE_EMAIL
  };
}
export function hideChangeEmail() {
  return {
    type: actions.HIDE_CHANGE_EMAIL
  };
}

export function showChangePassword() {
  return {
    type: actions.SHOW_CHANGE_PASSWORD
  };
}
export function hideChangePassword() {
  return {
    type: actions.HIDE_CHANGE_PASSWORD
  };
}

export function showChangeUsername() {
  return {
    type: actions.SHOW_CHANGE_USERNAME
  };
}
export function hideChangeUsername() {
  return {
    type: actions.HIDE_CHANGE_USERNAME
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
