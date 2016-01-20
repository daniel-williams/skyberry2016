import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/contactActionCreators';
import Dashboard from '../pages/Dashboard';


function mapStateToProps(state) {
  return {
    identity: state.get('identity'),
    // accounts: state.get('accounts'),
    // projects: state.get('projects'),
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
