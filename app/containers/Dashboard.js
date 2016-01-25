import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/dashboardActionCreators';
import Dashboard from '../pages/dashboard/Dashboard';


function mapStateToProps(state) {
  return {
    user: state.get('user').toJS(),
    hasFetchedAccounts: state.getIn(['accounts', 'hasFetched']),
    accountOptions: state.getIn(['accounts', 'accountOptions']).toJS(),
    selectedAccount: state.getIn(['accounts', 'selectedKey']),
    projectOptions: state.getIn(['accounts', 'projectOptions']).toJS(),
    selectedProject: state.getIn(['projects', 'selectedKey']),
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
