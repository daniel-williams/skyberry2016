import {fromJS, Map} from 'immutable';

import * as settingsActions from '../actions/settingsActions';

const initialState = fromJS({
  newEmail: null,
  isEmailUpdating: false,
  emailUpdateDate: null,
  emailUpdateError: null,

  newUsername: null,
  isUsernameUpdating: false,
  usernameUpdateDate: null,
  usernameUpdateError: null,

  oldPassword: null,
  newPassword: null,
  confirmPassword: null,
  isPasswordUpdating: false,
  passwordUpdateDate: null,
  passwordUpdateError: null,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case settingsActions.SETTINGS_UPDATE_EMAIL: {
      return state.withMutations(state => {
        state.set('isEmailUpdating', true);
        state.set('newEmail', action.payload.email);
        return state;
      });
    }
    case settingsActions.SETTINGS_UPDATE_EMAIL_SUCCESS: {
      return state.withMutations(state => {
        state.set('isEmailUpdating', false);
        state.set('emailUpdateDate', action.payload.date);
        state.set('emailUpdateError', null);
        state.set('newEmail', null);
        return state;
      });
    }
    case settingsActions.SETTINGS_UPDATE_EMAIL_FAILED: {
      return state.withMutations(state => {
        state.set('isEmailUpdating', false);
        state.set('emailUpdateDate', action.payload.date);
        state.set('emailUpdateError', action.payload.error);
        return state;
      });
    }

    case settingsActions.SETTINGS_UPDATE_USERNAME: {
      return state.withMutations(state => {
        state.set('isUsernameUpdating', true);
        state.set('newEmail', action.payload.email);
        return state;
      });
    }
    case settingsActions.SETTINGS_UPDATE_USERNAME_SUCCESS: {
      return state.withMutations(state => {
        state.set('isUsernameUpdating', false);
        state.set('usernameUpdateDate', action.payload.date);
        state.set('usernameUpdateError', null);
        state.set('newUsername', null);
        return state;
      });
    }
    case settingsActions.SETTINGS_UPDATE_USERNAME_FAILED: {
      return state.withMutations(state => {
        state.set('isUsernameUpdating', false);
        state.set('usernameUpdateDate', action.payload.date);
        state.set('usernameUpdateError', action.payload.error);
        return state;
      });
    }

    case settingsActions.SETTINGS_UPDATE_PASSWORD: {
      return state.withMutations(state => {
        state.set('isPasswordUpdating', true);
        state.set('oldPassword', action.payload.oldPassword);
        state.set('newPassword', action.payload.newPassword);
        state.set('confirmPassword', action.payload.confirmPassword);
        return state;
      });
    }
    case settingsActions.SETTINGS_UPDATE_PASSWORD_SUCCESS: {
      return state.withMutations(state => {
        state.set('isPasswordUpdating', false);
        state.set('passwordUpdateDate', action.payload.date);
        state.set('passwordUpdateError', null);
        state.set('oldPassword', null);
        state.set('newPassword', null);
        state.set('confirmPassword', null);
        return state;
      });
    }
    case settingsActions.SETTINGS_UPDATE_PASSWORD_FAILED: {
      return state.withMutations(state => {
        state.set('isPasswordUpdating', false);
        state.set('passwordUpdateDate', action.payload.date);
        state.set('passwordUpdateError', action.payload.error);
        return state;
      });
    }
    default: {
      return state;
    }
  }
}
