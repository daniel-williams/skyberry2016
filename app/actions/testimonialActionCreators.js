import {getJson} from '../services/FetchService';

import * as testimonialActions from './testimonialActions';


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
    type: testimonialActions.TESTIMONIALS_FETCHING,
  };
}

export function fetchTestimonialsSuccess(json) {
  return {
    type: testimonialActions.testimonialActions.TESTIMONIALS_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      items: json,
    }
  };
}

export function fetchTestimonialsFailed(error) {
  return {
    type: testimonialActions.TESTIMONIALS_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}
