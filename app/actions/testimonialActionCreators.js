import SkyberryFetch from '../services/SkyberryFetchService';

import * as actions from './testimonialActions';


export function fetchTestimonials() {
  return function(dispatch) {
    dispatch(fetchingTestimonials());

    SkyberryFetch.getJson('/api/testimonials')
    .then(json => dispatch(fetchTestimonialsSuccess(json)))
    .catch(error => dispatch(fetchTestimonialsFailed(error)));
  }
}


export default {
  fetchTestimonials,
}


function fetchingTestimonials() {
  return {
    type: actions.FETCHING_TESTIMONIALS,
  };
}

function fetchTestimonialsSuccess(json) {
  return {
    type: actions.FETCH_TESTIMONIALS_SUCCESS,
    payload: {
      date: new Date(),
      items: json,
    }
  };
}

function fetchTestimonialsFailed(error) {
  return {
    type: actions.FETCH_TESTIMONIALS_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}
