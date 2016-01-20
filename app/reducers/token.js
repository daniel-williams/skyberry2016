import {fromJS} from 'immutable';

import {
    TOKEN_REQUEST,
    TOKEN_REQUEST_SUCCESS,
    TOKEN_REQUEST_FAILED
} from '../actions';

const initialState = fromJS({
  isRequesting: false,
  lastRequestDate: null,
  lastRequestError: null,

  refreshToken: null,
  accessToken: null,
  expireDate: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case TOKEN_REQUEST: {
      return state.withMutations(state => {
        state.set('isRequesting', true);
        return state;
      });
    }
    case TOKEN_REQUEST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', null);

        state.set('refreshToken', action.payload.refreshToken);
        state.set('accessToken', action.payload.accessToken);
        state.set('expireDate', action.payload.expireDate);
        return state;
      });
    }
    case TOKEN_REQUEST_FAILED: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', action.payload.error);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
