import {getJson} from '../services/FetchService';
import {
  PORTFOLIO_SET_SELECTED,
  PORTFOLIO_FETCHING,
  PORTFOLIO_FETCH_SUCCESS,
  PORTFOLIO_FETCH_FAILED
} from '.';


export function switchPortfolio(selected) {
  return function(dispatch, getState) {
    const hasCollection = getState().getIn(['portfolio', 'collections']).has(selected);
console.log('hasCollection', selected, hasCollection);
    if(!hasCollection) {
      fetchPortfolio(selected)(dispatch, getState);
    }
    dispatch(setSelectedPortfolio(selected));
  }
}

export function fetchPortfolio(selected) {
  return function(dispatch) {
    dispatch(fetchingPortfolio());

    getJson('/api/portfolio?c=' + selected)
      .then(json => dispatch(fetchPortfolioSuccess(selected, json)))
      .catch(error => dispatch(fetchPortfolioFailed(error)));
  }
}


export function fetchingPortfolio() {
  return {
    type: PORTFOLIO_FETCHING,
  };
}

export function fetchPortfolioSuccess(selected, json) {
  return {
    type: PORTFOLIO_FETCH_SUCCESS,
    payload: {
      date: new Date(),
      selected: selected,
      items: json,
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

export function setSelectedPortfolio(selected) {
  return {
    type: PORTFOLIO_SET_SELECTED,
    payload: {
      selected: selected
    }
  };
}
