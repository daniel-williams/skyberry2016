import {fromJS} from 'immutable';

import * as consultationActions from '../actions/consultationActions';

const initialFormData = fromJS({
  name: null,
  email: null,
  phone: null,
  summary: null,
});
const initialState = fromJS({
  hasPosted: false,
  isPosting: false,
  date: null,
  error: null,

  formData: initialFormData,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case consultationActions.POSTING_CONSULTATION: {
      return state.withMutations(state => {
        state.set('isPosting', true);
        state.set('formData', state.get('formData').merge(action.payload.formData));
        return state;
      });
    }
    case consultationActions.POST_CONSULTATION_SUCCESS: {
      console.log('right fucking here!');
      return state.withMutations(state => {
        state.set('hasPosted', true);
        state.set('isPosting', false);
        state.set('date', action.payload.date);
        state.set('error', null);
        return state;
      });
    }
    case consultationActions.POST_CONSULTATION_FAILED: {
      return state.withMutations(state => {
        state.set('isPosting', false);
        state.set('date', action.payload.date);
        state.set('error', action.payload.error);
        return state;
      });
    }
    case consultationActions.RESET_CONSULTATION: {
      return state.withMutations(state => {
        state.set('hasPosted', false);
        state.set('isPosting', false);
        state.set('date', null);
        state.set('error', null);

        return state;
      });
    }
    default: {
      return state;
    }
  }
}
