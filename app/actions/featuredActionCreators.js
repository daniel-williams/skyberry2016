import SkyberryFetch from '../services/SkyberryFetchService';

import * as featuredActions from './featuredActions';


export function fetchFeatured() {
  return function(dispatch) {
    dispatch(fetchingFeatured());

    SkyberryFetch.getJson('/api/portfolio')
      .then(json => dispatch(fetchFeaturedSuccess(json)))
      .catch(error => dispatch(fetchFeaturedFailed(error)));
  }
}


export default {
  fetchFeatured,
}


// internal helpers
function fetchingFeatured() {
  return {
    type: featuredActions.FEATURED_FETCHING,
  };
}
function fetchFeaturedSuccess(json) {
  return {
    type: featuredActions.FEATURED_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      items: json,
    }
  };
}
export function fetchFeaturedFailed(error) {
  return {
    type: featuredActions.FEATURED_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}
