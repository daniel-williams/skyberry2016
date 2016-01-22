import {fromJS} from 'immutable';

import {
  SET_NEXT_URL,
  CLEAR_NEXT_URL,

  IDENTITY_REQUESTED,
  IDENTITY_REQUEST_SUCCESS,
  IDENTITY_REQUEST_FAILED,
  IDENTITY_RESET,
} from '../actions';


const initialState = fromJS({
  isRequesting: false,
  lastRequestDate: null,
  lastRequestError: null,

  isAuthenticated: false,
  id: null,
  username: null,
  accessToken: null,
  refreshToken: null, // todo: move to local storage
  issued: null,
  expires: null,

  nextUrl: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_NEXT_URL: {
      return state.set('nextUrl', action.payload.nextUrl);
    }
    case CLEAR_NEXT_URL: {
      return state.set('nextUrl', null);
    }
    case IDENTITY_REQUESTED: {
      return state.set('isRequesting', true);
    }
    case IDENTITY_REQUEST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', null);
        state.set('isAuthenticated', true);

        const identity = action.payload.identity;
        const issued = new Date(identity['.issued']);
        const expires = new Date(identity['.expires']);
        state.set('id', identity.id);
        state.set('username', identity.username);
        state.set('refreshToken', identity.refresh_token);
        state.set('accessToken', identity.access_token);
        state.set('issued', issued);
        state.set('expires', expires);
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
    default:
      return state;
  }
}
