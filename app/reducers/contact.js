import {fromJS} from 'immutable';

import {
    CONTACT_RESET,
    CONTACT_POSTING,
    CONTACT_POST_SUCCESS,
    CONTACT_POST_FAILED
} from '../actions';


const initialState = fromJS({
  hasPosted: false,
  isPosting: false,
  lastPostDate: null,
  lastPostError: null,

  message: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case CONTACT_RESET: {
      return state.set('hasPosted', false);
    }
    case CONTACT_POSTING: {
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);
        state.set('message', action.payload.form.message);
        return state;
      });
    }
    case CONTACT_POST_SUCCESS: {
      return state.withMutations(state => {
        state.set('hasPosted', true);
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);
        state.set('message', null);
        return state;
      });
    }
    case CONTACT_POST_FAILED: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', action.payload.error);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}