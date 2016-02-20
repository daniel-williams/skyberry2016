import {postJson} from '../services/FetchService';
import * as subscribeActions from './subscribeActions';


export function submitSubscribe(formData) {
  return function(dispatch) {
    dispatch(postingSubscribe(formData));

    postJson('/api/subscribe', formData)
      .then(() => dispatch(postSubscribeSuccess()))
      .catch(error => dispatch(postSubscribeFailed(error)));
  }
}


export function postingSubscribe(formData) {
  return {
    type: subscribeActions.SUBSCRIBE_POSTING,
    payload: {
      form: formData
    }
  };
}

export function postSubscribeSuccess() {
  return {
    type: subscribeActions.SUBSCRIBE_POST_SUCCESS,
    payload: {
      date: new Date()
    }
  };
}

export function postSubscribeFailed(error) {
  return {
    type: subscribeActions.SUBSCRIBE_POST_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}

export function showSubscribe() {
  return {
    type: subscribeActions.SUBSCRIBE_SHOW
  };
}

export function hideSubscribe() {
  return {
    type: subscribeActions.SUBSCRIBE_HIDE
  };
}
