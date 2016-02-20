import {fromJS} from 'immutable';

import * as identityActions from '../actions/identityActions';
import * as redirectActions from '../actions/redirectActions';


const initialState = fromJS({
  isRequesting: false,
  lastRequestDate: null,
  lastRequestError: null,

  isAuthenticated: false,
  id: null,
  issued: null,
  expires: null,

  next: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case identityActions.FETCH_IDENTITY: {
      return state.set('isRequesting', true);
    }
    case identityActions.FETCH_IDENTITY_SUCCESS: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', null);

        const identity = action.payload.identity;
        state.set('isAuthenticated', true);
        state.set('id', identity.user_id);
        state.set('issued', new Date(identity['.issued']));
        state.set('expires', new Date(identity['.expires']));
        return state;
      });
    }
    case identityActions.FETCH_IDENTITY_FAILED: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', action.payload.error);
        return state;
      });
    }
    case identityActions.RESET_IDENTITY: {
      return initialState;
    }
    case redirectActions.NEXT_SET: {
      return state.set('next', action.payload.next);
    }
    case redirectActions.NEXT_CLEAR: {
      return state.set('next', null);
    }
    default:
      return state;
  }
}
