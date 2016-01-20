import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON, resolveJSON, resolveErrors} from './fetch-helpers';
import {fromJS} from 'immutable';

import {
  CONTACT_RESET,
  CONTACT_POSTING,
  CONTACT_POST_SUCCESS,
  CONTACT_POST_FAILED
} from '.';
import {getFormErrors} from '../utils/FormUtils';


export function resetContact() {
  return {
    type: CONTACT_RESET
  };
}

export function handleSubmit(formData) {
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
      .then(resolveJSON)
      .then(resolveErrors)
      .then(json => {
        console.log('SUCCESS', json);
        dispatch({
          type: CONTACT_POST_SUCCESS,
          payload: {
            date: new Date()
          }
        });
      })
      .catch(error => {
        console.log('ERROR:', error);
        dispatch({
          type: CONTACT_POST_FAILED,
          payload: {
            date: new Date(),
            error: fromJS(getFormErrors('contact.', error)),
          }
        });
      });
  }
}
