import FetchService from '../services/FetchService';
import {getFormErrors} from '../utils/FormUtils';
import * as contactActions from './contactActions';


export function handleSubmit(formData) {
  return function(dispatch) {
    dispatch(postingContact(formData));

    FetchService.postJson('/api/contact', formData)
      .then(() => dispatch(postContactSuccess()))
      .catch(error => dispatch(postContactFailed(error)));
  }
}

export function postingContact(formData){
  return {
    type: contactActions.CONTACT_POSTING,
    payload: {
      form: formData
    }
  };
}
export function postContactSuccess() {
  return {
    type: contactActions.CONTACT_POST_SUCCESS,
    payload: {
      date: new Date()
    }
  };
}
export function postContactFailed(error) {
  return {
    type: contactActions.CONTACT_POST_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}
export function resetContact() {
  return {
    type: contactActions.CONTACT_RESET
  };
}
