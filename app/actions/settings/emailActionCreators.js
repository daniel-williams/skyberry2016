import FetchService from '../../services/FetchService';
import * as actions from './emailActions';


export function updateEmail(formData) {
  return function(dispatch) {
    dispatch(updatingEmail(formData));

    FetchService.postJson('/api/users/email', formData, true)
      .then((json) => dispatch(updateEmailSuccess(json)))
      .catch(error => dispatch(updateEmailFailed(error)));
  };
}
export function resetChangeEmail() {
  return {
    type: actions.UPDATE_EMAIL_RESET,
  };
}


export default {
  updateEmail,
  resetChangeEmail,
}


// internal helper functions
function updatingEmail(formData) {
  return {
    type: actions.UPDATING_EMAIL,
    payload: formData,
  };
}

function updateEmailSuccess(json) {
  return {
    type: actions.UPDATE_EMAIL_SUCCESS,
    payload: {
      date: new Date(),
      email: json.payload.email,
    },
  };
}
function updateEmailFailed(error) {
  return {
    type: actions.UPDATE_EMAIL_FAILED,
    payload: {
      date: new Date(),
      error: error,
    },
  };
}
