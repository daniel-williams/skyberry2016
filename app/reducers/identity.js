import {fromJS} from 'immutable';

import {
  IDENTITY_FETCHING,
  IDENTITY_FETCH_SUCCESS,
  IDENTITY_FETCH_FAILED,
  IDENTITY_RESET,
} from '../actions/identityActions';
import {
  NEXT_SET,
  NEXT_CLEAR,
} from '../actions/redirectActions';


const initialState = fromJS({
  isRequesting: false,
  lastRequestDate: null,
  lastRequestError: null,

  isAuthenticated: false,
  id: null,
  username: null,
  issued: null,
  expires: null,

  next: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case IDENTITY_FETCHING: {
      return state.set('isRequesting', true);
    }
    case IDENTITY_FETCH_SUCCESS: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', null);

        const identity = action.payload.identity;
        state.set('isAuthenticated', true);
        state.set('id', identity.id);
        state.set('username', identity.username);
        state.set('issued', new Date(identity['.issued']));
        state.set('expires', new Date(identity['.expires']));
        return state;
      });
    }
    case IDENTITY_FETCH_FAILED: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', action.payload.error);
        return state;
      });
    }
    case IDENTITY_RESET: {
      return initialState;
    }
    case NEXT_SET: {
      return state.set('next', action.payload.next);
    }
    case NEXT_CLEAR: {
      return state.set('next', null);
    }
    default:
      return state;
  }
}
