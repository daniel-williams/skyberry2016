import {fromJS} from 'immutable';

import {
  CONTACT_POSTING,
} from '../actions';


const initialState = fromJS({
  id: null,
  username: null,
  email: null,
  emailConfirmed: false,
  firstName: null,
  lastName: null,
  title: null,
  roles: [],
});

export default function(state = initialState, action) {
  switch(action.type) {
    case CONTACT_POSTING: {
      return state.withMutations(state => {
        state.set('name', action.payload.form.name);
        state.set('email', action.payload.form.email);
        return state;
      });
    }
    default:
      return state;
  }
}
