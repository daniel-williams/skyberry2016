import {fromJS, Map} from 'immutable';

import * as actions from '../../actions/settings/usernameActions';

const initialData = {
  newUsername: null,
  confirmUsername: null,
};
const initialState = fromJS({
  data: initialData,
  isUpdating: false,
  hasUpdated: false,
  error: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.UPDATE_USERNAME: {
      return state.withMutations(state => {
        state.set('isUpdating', true);
        state.set('data', action.payload);
        return state;
      });
    }
    case actions.UPDATE_USERNAME_SUCCESS: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('hasUpdated', true);
        state.set('date', action.payload.date);
        state.set('error', null);
        state.set('data', initialData);
        return state;
      });
    }
    case actions.UPDATE_USERNAME_FAILED: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('date', action.payload.date);
        state.set('error', action.payload.error);
        return state;
      });
    }
    case actions.UPDATE_USERNAME_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
