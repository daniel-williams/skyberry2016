import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/identityActionCreators';
import SignOut from '../pages/SignOut';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['identity', 'isAuthenticated']),
  };
}

export default connect(mapStateToProps, actions)(SignOut);
