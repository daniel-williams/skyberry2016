import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {switchProject} from '../actions/projectActionCreators';
import {switchAccount} from '../actions/accountActionCreators';
import Dashboard from '../pages/dashboard/Dashboard';


const actions = {
  switchAccount,
  switchProject,
};

function mapStateToProps(state) {
  const selectedAccount = state.getIn(['account', 'selectedKey']);
  const selectedProject = state.getIn(['project', 'selectedKey']);
  let projectOptions = [];
  if(selectedAccount) {
    try {
      projectOptions = state.getIn(['project', 'projectOptionsMap', selectedAccount]).toJS();
    } catch(e) {}
  }

  return {
    //user: state.get('user').toJS(),
    hasFetchedAccounts: state.getIn(['account', 'hasFetched']),
    accountOptions: state.getIn(['account', 'accountOptions']).toJS(),
    selectedAccount: selectedAccount,
    projectOptions: projectOptions,
    selectedProject: selectedProject,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
