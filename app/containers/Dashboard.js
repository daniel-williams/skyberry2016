import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/dashboardActionCreators';
import Dashboard from '../pages/dashboard/Dashboard';


function mapStateToProps(state, ownProps) {
  const accountOptions = state.getIn(['account', 'accountOptions']).toJS();
  const accountSlug = ownProps.params.aSlug || state.getIn(['account', 'selectedKey']) || (accountOptions.length ? accountOptions[0].value : null);
  let projectOptions = [];
  if(accountSlug) {
    try {
      projectOptions = state.getIn(['project', 'projectOptionsMap', accountSlug]).toJS();
    } catch(e) {}
  }
  const projectSlug = ownProps.params.pSlug || state.getIn(['project', 'selectedKey']) || (projectOptions.length ? projectOptions[0].value : null);

  return {
    hasFetchedAccounts: state.getIn(['account', 'hasFetched']),
    accountOptions: accountOptions,
    selectedAccount: accountSlug,
    projectOptions: projectOptions,
    selectedProject: projectSlug,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
