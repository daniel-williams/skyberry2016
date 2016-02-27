import {Map, List, fromJS} from 'immutable';

import * as subscribeActions from '../actions/subscribeActions';

const initialState = fromJS({
  isPosting: false,
  lastPostDate: null,
  lastPostError: null,

  isActive: true,
  showSubscribe: false,
  email: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case subscribeActions.POSTING_SUBSCRIBE: {
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);

        state.set('email', action.payload.form.email);
        return state;
      });
    }
    case subscribeActions.POST_SUBSCRIBE_SUCCESS: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);

        state.set('isActive', false);
        return state;
      });
    }
    case subscribeActions.POST_SUBSCRIBE_FAILED: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', action.payload.error);
        return state;
      });
    }
    case subscribeActions.SHOW_SUBSCRIBE: {
      return state.set('showSubscribe', true);
    }
    case subscribeActions.HIDE_SUBSCRIBE: {
      return state.set('showSubscribe', false);
    }
    default: {
      return state;
    }
  }
}
