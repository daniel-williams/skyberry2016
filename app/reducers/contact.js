import {fromJS} from 'immutable';

import * as contactActions from '../actions/contactActions';


const initialState = fromJS({
  isPosting: false,
  hasPosted: false,
  date: null,
  error: null,

  name: null,
  email: null,
  message: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case contactActions.POSTING_CONTACT: {
      return state.withMutations(state => {
        state.set('isPosting', true);

        const form = action.payload.form;
        state.set('name', form.name);
        state.set('email', form.email);
        state.set('message', form.message);
        return state;
      });
    }
    case contactActions.POST_CONTACT_SUCCESS: {
      return state.withMutations(state => {
        state.set('hasPosted', true);
        state.set('isPosting', false);
        state.set('date', action.payload.date);
        state.set('error', null);

        state.set('message', null);
        return state;
      });
    }
    case contactActions.POST_CONTACT_FAILED: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('date', action.payload.date);
        state.set('error', action.payload.error);
        return state;
      });
    }
    case contactActions.RESET_CONTACT: {
      return state.withMutations(state => {
        state.set('hasPosted', false);
        state.set('isPosting', false);
        state.set('date', null);
        state.set('error', null);

        state.set('message', null);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
