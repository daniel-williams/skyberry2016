import {setPromptToSubscribe} from '../services/StorageService';
import SkyberryFetch from '../services/SkyberryFetchService';
import * as actions from './subscribeActions';


export function postSubscribe(formData) {
  return function(dispatch) {
    dispatch(postingSubscribe(formData));

    SkyberryFetch.postJson('/api/subscribe', formData)
      .then(() => {
        setPromptToSubscribe(false);
        dispatch(postSubscribeSuccess());
      })
      .catch(error => dispatch(postSubscribeFailed(error)));
  }
}

export function showSubscribe() {
  return {
    type: actions.SHOW_SUBSCRIBE
  };
}

export function hideSubscribe() {
  return {
    type: actions.HIDE_SUBSCRIBE
  };
}


export default {
  postSubscribe,
  showSubscribe,
  hideSubscribe,
}


// internal helpers
function postingSubscribe(formData) {
  return {
    type: actions.POSTING_SUBSCRIBE,
    payload: {
      form: formData
    }
  };
}

function postSubscribeSuccess() {
  return {
    type: actions.POST_SUBSCRIBE_SUCCESS,
    payload: {
      date: new Date()
    }
  };
}

function postSubscribeFailed(error) {
  return {
    type: actions.POST_SUBSCRIBE_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}
