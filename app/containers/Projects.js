import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/projectActionCreators';
import Projects from '../pages/dashboard/Projects';


function mapStateToProps(state, ownProps) {
  let {aSlug, pSlug} = ownProps.params,
    accountOptions = [],
    hasFetchedAccounts = state.getIn(['account', 'hasFetched']),
    accountSlug,
    projectOptions = [],
    hasFetchedProject = false,
    projectSlug,
    compositeSlug,
    project;

  if(hasFetchedAccounts) {
    try {
      accountOptions = state.getIn(['account', 'accountOptions']).toJS();
    } catch(e) {}

    if(accountOptions.find(item => item.value === aSlug)) {
      accountSlug = aSlug;
    } else {
      accountSlug = accountOptions.length ? accountOptions[0].value : null;
    }

    if(accountSlug) {
      try {
        projectOptions = state.getIn(['project', 'projectOptionsMap', accountSlug]).toJS();
      } catch(e) {}

      compositeSlug = accountSlug + '/' + pSlug;
      if(!projectOptions.find(item => item.value === compositeSlug)) {
        compositeSlug = projectOptions.length ? projectOptions[0].value : null;
      }

      hasFetchedProject = state.getIn(['project', 'projects']).has(compositeSlug);
      if(hasFetchedProject) {
        project = state.getIn(['project', 'projects', compositeSlug]).toJS();
      }
    }

  }


  return {
    isFetching: state.getIn(['project', 'isFetching']),
    hasFetchedAccounts: hasFetchedAccounts,
    accountOptions: accountOptions,
    accountSlug: accountSlug,
    hasFetchedProject: hasFetchedProject,
    projectOptions: projectOptions,
    projectSlug: projectSlug,
    compositeSlug: compositeSlug,
    project: project,
  };
}

export default connect(mapStateToProps, actions)(Projects);
