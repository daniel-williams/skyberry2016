import SkyberryFetch from '../services/SkyberryFetchService';
import * as portfolioActions from './portfolioActions';


export function switchPortfolio(key) {
  return function(dispatch, getState) {
    const hasCollection = getState().getIn(['portfolio', 'items']).has(key);

    if(!hasCollection) {
      fetchPortfolio(key)(dispatch, getState);
    }
    dispatch(setSelectedPortfolio(key));
  }
}

export function fetchPortfolio(key) {
  return function(dispatch) {
    dispatch(fetchingPortfolio());

    SkyberryFetch.getJson('/api/portfolio?c=' + key)
      .then(json => dispatch(fetchPortfolioSuccess(key, json)))
      .catch(error => dispatch(fetchPortfolioFailed(error)));
  }
}


export default {
  switchPortfolio,
  fetchPortfolio,
}


// internal helpers
function fetchingPortfolio() {
  return {
    type: portfolioActions.FETCHING_PORTFOLIO,
  };
}

function fetchPortfolioSuccess(key, json) {
  return {
    type: portfolioActions.FETCH_PORTFOLIO_SUCCESS,
    payload: {
      date: new Date(),
      key: key,
      images: json,
    }
  };
}

function fetchPortfolioFailed(error) {
  return {
    type: portfolioActions.FETCH_PORTFOLIO_FAILED,
    payload: {
      date: new Date(),
      error: error
    }
  };
}

function setSelectedPortfolio(key) {
  return {
    type: portfolioActions.SET_SELECTED_PORTFOLIO,
    payload: {
      key: key
    }
  };
}
