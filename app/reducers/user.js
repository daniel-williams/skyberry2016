import {fromJS, List} from 'immutable';

import * as userActions from '../actions/userActions';


const initialState = fromJS({
  isRequesting: false,
  lastRequestDate: null,
  lastRequestError: null,

  isAuthenticated: false,
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
  console.log(action);
  switch(action.type) {
    case userActions.FETCH_USER: {
      return state.set('isRequesting', true);
    }
    case userActions.FETCH_USER_SUCCESS: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', null);

        const user = action.payload.user;
        state.set('isAuthenticated', true);
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
    case userActions.FETCH_USER_FAILED: {
      return state.withMutations(state => {
        state.set('isRequesting', false);
        state.set('lastRequestDate', action.payload.date);
        state.set('lastRequestError', action.payload.error);
        return state;
      });
    }
    case userActions.RESET_USER: {
      return initialState;
    }
    default:
      return state;
  }
}
