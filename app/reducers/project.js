import {fromJS} from 'immutable';

import * as projectActions from '../actions/projectActions';


const initialState = fromJS({
  isFetching: false,
  lastFetchDate: null,
  lastFetchError: null,

  projectDirectory: {},
  projects: {},
});

export default function(state = initialState, action) {
  switch(action.type) {
    case projectActions.FETCHING_PROJECT: {
      return state.set('isFetching', true);
    }
    case projectActions.FETCH_PROJECT_SUCCESS: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', null);

        state.setIn(['projects', action.payload.key], fromJS(action.payload.project));
        return state;
      });
    }
    case projectActions.FETCH_PROJECT_FAILED: {
      return state.withMutations(state => {
        state.set('isFetching', false);
        state.set('lastFetchDate', action.payload.date);
        state.set('lastFetchError', action.payload.error);
        return state;
      });
    }
    case projectActions.SET_PROJECT_DIRECTORY: {
      return state.set('projectDirectory', fromJS(action.payload.projectDirectory))
    }
    case projectActions.RESET_PROJECTS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
