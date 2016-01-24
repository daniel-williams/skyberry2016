import {fromJS} from 'immutable';

import {
  IDENTITY_REQUESTED,
  IDENTITY_REQUEST_SUCCESS,
  IDENTITY_REQUEST_FAILED,
  IDENTITY_RESET,
  NEXT_SET,
  NEXT_CLEAR,
} from '../actions';


const initialState = fromJS({
  isRequesting: false,
  lastRequestDate: null,
  lastRequestError: null,

  isAuthenticated: false,
  id: null,
  username: null,
  // accessToken: null,
  // refreshToken: null,
  issued: null,
  expires: null,

  next: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case IDENTITY_REQUESTED: {
      return state.set('isRequesting', true);
    }
    case IDENTITY_REQUEST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', null);

        const identity = action.payload.identity;
        state.set('isAuthenticated', true);
        state.set('id', identity.id);
        state.set('username', identity.username);
        // state.set('refreshToken', identity.refresh_token);
        // state.set('accessToken', identity.access_token);
        state.set('issued', new Date(identity['.issued']));
        state.set('expires', new Date(identity['.expires']));
        return state;
      });
    }
    case IDENTITY_REQUEST_FAILED: {
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
