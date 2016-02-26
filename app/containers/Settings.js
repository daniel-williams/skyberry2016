import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as settingsActions from '../actions/settings/actionCreators';
import * as emailActions from '../actions/settings/emailActionCreators';
import * as passwordActions from '../actions/settings/passwordActionCreators';
import * as usernameActions from '../actions/settings/usernameActionCreators';
import Settings from '../pages/dashboard/settings';

const actions = Object.assign({}, settingsActions, emailActions, passwordActions, usernameActions);

function mapStateToProps(state, ownProps) {
  const user = state.get('user').toJS();
  const settings = state.get('settings').toJS();

  return {
    user,
    settings,
  };
}

export default connect(mapStateToProps, actions)(Settings);
