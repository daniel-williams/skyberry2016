import {Map, List, fromJS} from 'immutable';

import * as actions from '../actions/subscribeActions';

const initialFormData = fromJS({
  email: null,
});
const initialState = fromJS({
  show: false,
  isUpdating: false,
  hasUpdated: false,
  date: null,
  error: null,
  formData: initialFormData,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.POSTING_SUBSCRIBE: {
      return state.merge({
        isUpdating: true,
        date: null,
        error: null,
        formData: fromJS(action.payload.formData)
      });
    }
    case actions.POST_SUBSCRIBE_SUCCESS: {
      return state.merge({
        isUpdating: false,
        hasUpdated: true,
        date: action.payload.date,
        error: null,
      });
    }
    case actions.POST_SUBSCRIBE_FAILED: {
      return state.merge({
        isUpdating: false,
        date: action.payload.date,
        error: action.payload.error,
      });
    }
    case actions.POST_SUBSCRIBE_RESET: {
      return initialState;
    }
    case actions.SHOW_SUBSCRIBE: {
      return state.set('show', true);
    }
    case actions.HIDE_SUBSCRIBE: {
      return state.set('show', false);
    }
    default: {
      return state;
    }
  }
}
