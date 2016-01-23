import {Map, List, fromJS} from 'immutable';

import {
    SUBSCRIBE_POSTING,
    SUBSCRIBE_POST_SUCCESS,
    SUBSCRIBE_POST_FAILED,
    SUBSCRIBE_SHOW,
    SUBSCRIBE_HIDE,
} from '../actions';

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
    case SUBSCRIBE_POSTING: {
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('lastPostDate', null);
        state.set('lastPostError', null);

        state.set('email', action.payload.form.email);
        return state;
      });
    }
    case SUBSCRIBE_POST_SUCCESS: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', null);

        state.set('isActive', false);
        return state;
      });
    }
    case SUBSCRIBE_POST_FAILED: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('lastPostDate', action.payload.date);
        state.set('lastPostError', action.payload.error);
        return state;
      });
    }
    case SUBSCRIBE_SHOW: {
      return state.set('showSubscribe', true);
    }
    case SUBSCRIBE_HIDE: {
      return state.set('showSubscribe', false);
    }
    default: {
      return state;
    }
  }
}
