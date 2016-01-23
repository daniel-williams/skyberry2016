import {getJson} from '../services/FetchService';
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
    dispatch(setPortfolio(key));
  }
}

export function fetchPortfolio(key) {
  return function(dispatch) {
    dispatch(fetchingPortfolio());

    getJson('/api/portfolio?c=' + key)
    .then(json => dispatch(fetchPortfolioSuccess(key, json)))
    .catch(error => dispatch(fetchPortfolioFailed(error)));
  }
}


export function fetchingPortfolio() {
  return {
    type: PORTFOLIO_FETCHING,
  };
}

export function fetchPortfolioSuccess(key, json) {
  return {
    type: PORTFOLIO_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      key: key,
      images: json,
    }
  };
}

export function fetchPortfolioFailed(error) {
  return {
    type: PORTFOLIO_FETCH_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}

export function setPortfolio(key) {
  return {
    type: PORTFOLIO_SET,
    payload: {
      key: key
    }
  };
}
