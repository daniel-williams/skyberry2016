import {fromJS} from 'immutable';

import {
  PROJECT_FETCHING,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_FAILED,
  PROJECT_RESET,
  PROJECT_SET_SELECTED,
  SET_PROJECT_LOOKUP,
} from '../actions/projectActions';


const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  projects: {},
  selectedKey: null,
  projectLookup: {},
});

export default function(state = initialState, action) {
  switch(action.type) {
    case PROJECT_FETCHING: {
      return state.set('isFetching', true);
    }
    case PROJECT_FETCH_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.setIn(['projects', action.payload.key], fromJS(action.payload.project));
        return state;
      });
    }
    case PROJECT_FETCH_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case PROJECT_SET_SELECTED: {
      return state.set('selectedKey', action.payload.key);
    }
    case SET_PROJECT_LOOKUP: {
      return state.set('projectLookup', fromJS(action.payload.projectLookup))
    }
    case PROJECT_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
