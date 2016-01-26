import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as identityAC from '../actions/identityActionCreators';
import * as redirectAC from '../actions/redirectActions';
import SignIn from '../pages/SignIn';

const actions = Object.assign({}, identityAC, redirectAC);

function mapStateToProps(state) {
  return {
    identity: state.get('identity').toJS(),
  };
}

export default connect(mapStateToProps, actions)(SignIn);
