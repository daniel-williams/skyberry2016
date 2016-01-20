import {fromJS} from 'immutable';

import {
  SET_NEXT_URL,
  CLEAR_NEXT_URL,

  IDENTITY_REQUESTED,
  IDENTITY_REQUEST_SUCCESS,
  IDENTITY_REQUEST_FAILED,
  IDENTITY_RESET,

  IDENTITY_REFRESH,
  IDENTITY_REFRESH_SUCCESS,
  IDENTITY_REFRESH_FAILED,
} from '../actions';


const initialState = fromJS({
  isRequesting: false,
  lastRequestDate: null,
  lastRequestError: null,

  id: null,
  username: null,
  email: null,
  emailConfirmed: false,
  firstName: null,
  lastName: null,
  title: null,
  roles: [],

  nextUrl: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null, // todo: move to local storage
  expireDate: null,
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
        state.set('lastRequestError', null);
        state.set('isAuthenticated', true);
        state.set('id', action.payload.id);
        state.set('username', action.payload.username);
        state.set('refreshToken', action.payload.refreshToken);
        state.set('accessToken', action.payload.accessToken);
        state.set('expireDate', action.payload.expireDate);
        return state;
      });
    }
    case IDENTITY_REQUEST_FAILED: {
      return fromJS(Object.assign({}, state, initialState, action.payload));
    }
    case IDENTITY_RESET: {
      return fromJS(Object.assign({}, state, initialState));
    }
    default:
      return state;
  }
}
