import {fromJS} from 'immutable';

import * as contactActions from '../actions/contactActions';


const initialState = fromJS({
  hasPosted: false,
  isPosting: false,
  lastPostDate: null,
  lastPostError: null,

  name: null,
  email: null,
  message: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case contactActions.CONTACT_POSTING: {
      return state.withMutations(state => {
        state.set('isPosting', true);

        const form = action.payload.form;
        state.set('name', form.name);
        state.set('email', form.email);
        state.set('message', form.message);
        return state;
      });
    }
    case contactActions.CONTACT_POST_SUCCESS: {
      return state.withMutations(state => {
        state.set('hasPosted', true);
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);

        state.set('message', null);
        return state;
      });
    }
    case contactActions.CONTACT_POST_FAILED: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', action.payload.error);
        return state;
      });
    }
    case contactActions.CONTACT_RESET: {
      return state.withMutations(state => {
        state.set('hasPosted', false);
        state.set('isPosting', false);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);

        state.set('message', null);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
