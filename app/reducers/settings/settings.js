import {fromJS, Map} from 'immutable';

import * as actions from '../../actions/settings/actions';

const initialState = fromJS({
  showChangeEmail: false,
  showChangeUsername: false,
  showChangePassword: false,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.SHOW_CHANGE_EMAIL: {
      return state.set('showChangeEmail', true);
    }
    case actions.HIDE_CHANGE_EMAIL: {
      return state.set('showChangeEmail', false);
    }
    case actions.SHOW_CHANGE_USERNAME: {
      return state.set('showChangeUsername', true);
    }
    case actions.HIDE_CHANGE_USERNAME: {
      return state.set('showChangeUsername', false);
    }
    case actions.SHOW_CHANGE_PASSWORD: {
      return state.set('showChangePassword', true);
    }
    case actions.HIDE_CHANGE_PASSWORD: {
      return state.set('showChangePassword', false);
    }
    default: {
      return state;
    }
  }
}
