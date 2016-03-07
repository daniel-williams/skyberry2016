import {fromJS} from 'immutable';

import * as identityActions from '../actions/identityActions';
import * as redirectActions from '../actions/redirectActions';

const initialFormData = fromJS({
  username: null,
  password: null,
});
const initialState = fromJS({
  isUpdating: false,
  date: null,
  error: null,

  isAuthenticated: false,
  id: null,
  issued: null,
  expires: null,

  formData: initialFormData,

  next: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case identityActions.FETCHING_IDENTITY: {
      return state.merge({
        isUpdating: true,
        formData: action.payload.formData,
      });
    }
    case identityActions.FETCH_IDENTITY_SUCCESS: {
      const {id, issued, expires} = action.payload.identity;

      return state.merge({
        isUpdating: false,
        date: action.payload.date,
        error: null,

        id: id,
        issued: new Date(issued),
        expires: new Date(expires),
        isAuthenticated: true,

        formData: initialFormData,
      });
      // return state.withMutations(state => {
      //   state.set('isUpdating', false);
      //   state.set('lastRequestDate', action.payload.date);
      //   state.set('lastRequestError', null);
      //
      //   const identity = action.payload.identity;
      //   state.set('isAuthenticated', true);
      //   state.set('id', identity.user_id);
      //   state.set('issued', new Date(identity['.issued']));
      //   state.set('expires', new Date(identity['.expires']));
      //   return state;
      // });
    }
    case identityActions.FETCH_IDENTITY_FAILED: {
      return state.merge({
        isUpdating: false,
        date: action.payload.date,
        error: action.payload.error,
      });
      // return state.withMutations(state => {
      //   state.set('isUpdating', false);
      //   state.set('lastRequestDate', action.payload.date);
      //   state.set('lastRequestError', action.payload.error);
      //   return state;
      // });
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
