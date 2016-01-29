import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/dashboardActionCreators';
import Dashboard from '../pages/dashboard/Dashboard';


function mapStateToProps(state, ownProps) {
  let {aSlug: accountSlug, pSlug: projectSlug} = ownProps.params,
    compositeSlug,
    accountOptions = [],
    projectOptions = [];

  const hasFetched = state.getIn(['account', 'hasFetched']);
  if(hasFetched) {
    try {
      accountOptions = state.getIn(['account', 'accountOptions']).toJS();
    } catch(e) {}

    if(!accountOptions.find(item => item.value === accountSlug)) {
      accountSlug = accountOptions.length ? accountOptions[0].value : null;
    }

    if(accountSlug) {
      try {
        projectOptions = state.getIn(['project', 'projectOptionsMap', accountSlug]).toJS();
      } catch(e) {}
    }

    compositeSlug = accountSlug + '/' + projectSlug;
    if(!projectOptions.find(item => item.value === compositeSlug)) {
      compositeSlug = projectOptions.length ? projectOptions[0].value : null;
    }
  }

  return {
    hasFetchedAccounts: hasFetched,
    accountOptions: accountOptions,
    selectedAccount: accountSlug,
    projectOptions: projectOptions,
    selectedProject: compositeSlug,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
