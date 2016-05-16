import SkyberryFetch from '../services/SkyberryFetchService';

import * as actions from './consultationActions';


export function postConsultation(formData) {
  return function(dispatch) {
    dispatch(postingConsultation(formData));

    SkyberryFetch.postJson('/api/consultation', formData)
      .then(() => dispatch(postConsultationSuccess()))
      .catch(error => dispatch(postConsultationFailed(error)));
  }
}

export function resetConsultation() {
  return {
    type: actions.RESET_CONSULTATION
  };
}


export default {
  postConsultation,
  resetConsultation,
}


// internal helpers
function postingConsultation(formData){
  return {
    type: actions.POSTING_CONSULTATION,
    payload: {
      formData: formData
    }
  };
}
function postConsultationSuccess() {
  return {
    type: actions.POST_CONSULTATION_SUCCESS,
    payload: {
      date: new Date()
    }
  };
}
function postConsultationFailed(error) {
  return {
    type: actions.POST_CONSULTATION_FAILED,
    payload: {
      date: new Date(),
      error: error,
    }
  };
}
