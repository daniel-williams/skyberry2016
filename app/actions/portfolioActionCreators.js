import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './fetch-helpers';
import store from '../store';

import {
  PORTFOLIO_SET,
  PORTFOLIO_FETCHING,
  PORTFOLIO_FETCH_SUCCESS,
  PORTFOLIO_FETCH_FAILED
} from '.';


export function switchPortfolio(key) {
  return function(dispatch, getState) {
    const tgtCollection = getState().getIn(['portfolio', 'collections', key]);

    if(!tgtCollection) {
      fetchPortfolio(key)(dispatch, getState);
    }

    dispatch({
      type: PORTFOLIO_SET,
      payload: {
        key: key
      }
    });
  }
}

export function fetchPortfolio(key) {
  return function(dispatch) {
    dispatch({
      type: PORTFOLIO_FETCHING,
    });

    fetch('/api/portfolio?c=' + key)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('portfolio result: ', json);
      return json;
    })
    .then(json => dispatch({
      type: PORTFOLIO_FETCH_SUCCESS,
      payload: {
        date: new Date(),
        key: key,
        images: json,
      }
    }))
    .catch(error => {
      dispatch({
        type: PORTFOLIO_FETCH_FAILED,
        payload: {
          date: new Date(),
          error: error
        }
      });
    });
  }
}
