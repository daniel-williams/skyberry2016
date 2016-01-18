import fetch from 'isomorphic-fetch';
import {checkStatus, toJSON} from './fetch-helper';

import {
  CONTACT_RESET,
  CONTACT_POSTING,
  CONTACT_POST_SUCCESS,
  CONTACT_POST_FAILED
} from '.';


export function resetContact() {
  return {
    type: CONTACT_RESET
  };
}

export function submitContact(formData) {
  return function(dispatch) {
    dispatch({
      type: CONTACT_POSTING,
      payload: {
        form: formData
      }
    });

    fetch('/api/contact', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(checkStatus)
    .then(() => {
      dispatch({
        type: CONTACT_POST_SUCCESS,
        payload: {
          date: new Date()
        }
      });
    })
    .catch(error => {
      dispatch({
        type: CONTACT_POST_FAILED,
        payload: {
          date: new Date(),
          error: error
        }
      });
    });
  }
}
