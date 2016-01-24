import {getJson} from '../services/FetchService';

import {
  TESTIMONIALS_FETCHING,
  TESTIMONIALS_FETCH_SUCCESS,
  TESTIMONIALS_FETCH_FAILED
} from '.';


export function fetchTestimonials() {
  return function(dispatch) {
    dispatch(fetchingTestimonials());

    getJson('/api/portfolio')
    .then(json => dispatch(fetchTestimonialsSuccess(json)))
    .catch(error => dispatch(fetchTestimonialsFailed(error)));
  }
}


export function fetchingTestimonials() {
  return {
    type: TESTIMONIALS_FETCHING,
  };
}

export function fetchTestimonialsSuccess(json) {
  return {
    type: TESTIMONIALS_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      items: json,
    }
  };
}

export function fetchTestimonialsFailed(error) {
  return {
    type: TESTIMONIALS_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}
