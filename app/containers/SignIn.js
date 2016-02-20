import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as identityActions from '../actions/identityActionCreators';
import * as redirectActions from '../actions/redirectActionCreators';
import SignIn from '../pages/SignIn';

const actions = Object.assign({}, identityActions, redirectActions);

function mapStateToProps(state) {
  return {
    identity: state.get('identity').toJS(),
  };
}

export default connect(mapStateToProps, actions)(SignIn);
