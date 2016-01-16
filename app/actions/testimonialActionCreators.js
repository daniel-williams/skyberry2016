import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helpers';
import store from '../store';

import {
  TESTIMONIALS_FETCHING,
  TESTIMONIALS_FETCH_SUCCESS,
  TESTIMONIALS_FETCH_FAILED
} from '.';


export function fetchTestimonials() {
  return function(dispatch) {
    dispatch({
      type: TESTIMONIALS_FETCHING,
    });

    fetch('/api/portfolio')
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => dispatch({
      type: TESTIMONIALS_FETCH_SUCCESS,
      payload: {
        date: new Date(),
        items: data,
      }
    }))
    .catch((err) => dispatch({
      type: TESTIMONIALS_FETCH_FAILED,
      payload: {
        date: new Date(),
        err: err
      }
    }));
  }
}
