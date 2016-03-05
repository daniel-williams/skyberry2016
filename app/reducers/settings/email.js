import {fromJS, Map} from 'immutable';

import * as actions from '../../actions/settings/emailActions';

const initialFormData = fromJS({
  newEmail: null,
  confirmEmail: null,
});
const initialState = fromJS({
  isUpdating: false,
  hasUpdated: false,
  error: null,
  formData: initialFormData,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.UPDATING_EMAIL: {
      return state.withMutations(state => {
        state.set('isUpdating', true);
        state.set('formData', action.payload.formData);
        return state;
      });
    }
    case actions.UPDATE_EMAIL_SUCCESS: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('hasUpdated', true);
        state.set('date', action.payload.date);
        state.set('error', null);
        state.set('formData', initialFormData);
        return state;
      });
    }
    case actions.UPDATE_EMAIL_FAILED: {
      return state.withMutations(state => {
        state.set('isUpdating', false);
        state.set('date', action.payload.date);
        state.set('error', action.payload.error);
        return state;
      });
    }
    case actions.UPDATE_EMAIL_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
