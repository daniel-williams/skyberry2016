import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/dashboardActionCreators';
import Dashboard from '../pages/dashboard/Dashboard';


function mapStateToProps(state) {
  return {
    user: state.get('user').toJS(),
    accounts: state.get('accounts').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
