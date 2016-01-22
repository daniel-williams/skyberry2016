import {postJson} from '../services/FetchService';
import {getFormErrors} from '../utils/FormUtils';
import {
  CONTACT_RESET,
  CONTACT_POSTING,
  CONTACT_POST_SUCCESS,
  CONTACT_POST_FAILED
} from '.';


export function handleSubmit(formData) {
  return function(dispatch) {
    dispatch(postingContact(formData));

    postJson('/api/contact', formData)
      .then(() => dispatch(postContactSuccess()))
      .catch(error => dispatch(postContactFailed(error)));
  }
}

export function postingContact(formData){
  return {
    type: CONTACT_POSTING,
    payload: {
      form: formData
    }
  };
}
export function postContactSuccess() {
  return {
    type: CONTACT_POST_SUCCESS,
    payload: {
      date: new Date()
    }
  };
}
export function postContactFailed(error) {
  return {
    type: CONTACT_POST_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}
export function resetContact() {
  return {
    type: CONTACT_RESET
  };
}
