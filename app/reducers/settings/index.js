import {Map} from 'immutable';

import settings from './settings';
import email from './email';
import username from './username';
import password from './password';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    settings: settings(state.get('settings'), action),
    email: email(state.get('email'), action),
    username: username(state.get('username'), action),
    password: password(state.get('password'), action),
  });
}
