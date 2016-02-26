import FetchService from '../../services/FetchService';
import * as actions from './usernameActions';


export function updateUsername(formData) {
  return function(dispatch) {
    dispatch(updatingUsername(formData));

    FetchService.postJson('/api/users/username', formData, true)
      .then((json) => dispatch(updateUsernameSuccess(json)))
      .catch(error => dispatch(updateUsernameFailed(error)));
  };
}
export function resetChangeUsername() {
  return {
    type: actions.UPDATE_USERNAME_RESET,
  };
}


export default {
  updateUsername,
  resetChangeUsername,
}


// internal helper functions
function updatingUsername(formData) {
  return {
    type: actions.UPDATING_USERNAME,
    payload: formData,
  };
}

function updateUsernameSuccess(json) {
  return {
    type: actions.UPDATE_USERNAME_SUCCESS,
    payload: {
      date: new Date(),
      username: json.payload.username,
    },
  };
}
function updateUsernameFailed(error) {
  return {
    type: actions.UPDATE_USERNAME_FAILED,
    payload: {
      date: new Date(),
      error: error,
    },
  };
}
