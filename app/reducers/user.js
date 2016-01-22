import {fromJS, List} from 'immutable';

import {
  USER_REQUESTED,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED,
  USER_RESET,
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
  contacts: [],
});

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_REQUESTED: {
      return state.set('isRequesting', true);
    }
    case USER_REQUEST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', null);

        const user = action.payload.user;
        state.set('id', user.id);
        state.set('username', user.username);
        state.set('email', user.email);
        state.set('emailConfirmed', user.emailConfirmed);
        state.set('firstName', user.firstName);
        state.set('lastName', user.lastName);
        state.set('title', user.title);
        state.set('roles', List(user.roles));
        state.set('contacts', List(user.contacts));
        return state;
      });
    }
    case USER_REQUEST_FAILED: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', action.payload.error);
        return state;
      });
    }
    case USER_RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
