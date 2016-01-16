import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helpers';
import store from '../store';

import {
  FEATURED_FETCHING,
  FEATURED_FETCH_SUCCESS,
  FEATURED_FETCH_FAILED
} from '.';


export function fetchFeatured() {
  return function(dispatch) {
    dispatch({
      type: FEATURED_FETCHING,
    });

    fetch('/api/portfolio')
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => dispatch({
      type: FEATURED_FETCH_SUCCESS,
      payload: {
        date: new Date(),
        items: data,
      }
    }))
    .catch(err => {
      console.log('err', err);
      dispatch({
        type: FEATURED_FETCH_FAILED,
        payload: {
          date: new Date(),
          err: err
        }
      });
    });
  }
}
