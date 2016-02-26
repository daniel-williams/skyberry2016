import {fromJS, Map} from 'immutable';

import * as actions from '../../actions/settings/actions';

const initialState = fromJS({
  showChangeEmail: false,
  showChangeUsername: false,
  showChangePassword: false,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.CHANGE_EMAIL_SHOW: {
      return state.set('showChangeEmail', true);
    }
    case actions.CHANGE_EMAIL_HIDE: {
      return state.set('showChangeEmail', false);
    }
    case actions.CHANGE_USERNAME_SHOW: {
      return state.set('showChangeUsername', true);
    }
    case actions.CHANGE_USERNAME_HIDE: {
      return state.set('showChangeUsername', false);
    }
    case actions.CHANGE_PASSWORD_SHOW: {
      return state.set('showChangePassword', true);
    }
    case actions.CHANGE_PASSWORD_HIDE: {
      return state.set('showChangePassword', false);
    }
    default: {
      return state;
    }
  }
}
