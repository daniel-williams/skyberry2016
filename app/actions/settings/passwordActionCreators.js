import SkyberryFetch from '../../services/SkyberryFetchService';
import * as actions from './passwordActions';


export function updatePassword(formData) {
  return function(dispatch) {
    dispatch(updatingPassword(formData));

    SkyberryFetch.postJson('/api/users/password', formData, true)
      .then(() => dispatch(updatePasswordSuccess()))
      .catch(error => dispatch(updatePasswordFailed(error)));
  };
}
export function resetChangePassword() {
  return {
    type: actions.UPDATE_PASSWORD_RESET,
  };
}


export default {
  updatePassword,
  resetChangePassword,
}


// internal helper functions
function updatingPassword(formData) {
  return {
    type: actions.UPDATING_PASSWORD,
    payload: {
      formData: formData,
    },
  };
}

function updatePasswordSuccess() {
  return {
    type: actions.UPDATE_PASSWORD_SUCCESS,
    payload: {
      date: new Date(),
    },
  };
}
function updatePasswordFailed(error) {
  return {
    type: actions.UPDATE_PASSWORD_FAILED,
    payload: {
      date: new Date(),
      error: error,
    },
  };
}
