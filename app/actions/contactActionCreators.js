import SkyberryFetch from '../services/SkyberryFetchService';

import * as actions from './contactActions';


export function postContact(formData) {
  return function(dispatch) {
    dispatch(postingContact(formData));

    SkyberryFetch.postJson('/api/contact', formData)
      .then(() => dispatch(postContactSuccess()))
      .catch(error => dispatch(postContactFailed(error)));
  }
}

export function resetContact() {
  return {
    type: actions.RESET_CONTACT
  };
}


export default {
  postContact,
  resetContact,
}


// internal helpers
function postingContact(formData){
  return {
    type: actions.POSTING_CONTACT,
    payload: {
      form: formData
    }
  };
}
function postContactSuccess() {
  return {
    type: actions.POST_CONTACT_SUCCESS,
    payload: {
      date: new Date()
    }
  };
}
function postContactFailed(error) {
  return {
    type: actions.POST_CONTACT_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}
