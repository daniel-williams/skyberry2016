import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/settingsActionCreators';
import Settings from '../pages/dashboard/Settings';


function mapStateToProps(state, ownProps) {
  const user = state.get('user').toJS();
  const settings = state.get('settings').toJS();

  return {
    user,
    settings,
  };
}

export default connect(mapStateToProps, actions)(Settings);
