import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Project from '../pages/dashboard/Project';



function mapStateToProps(state, ownProps) {

  let {aSlug: accountSlug, pSlug: projectSlug} = ownProps.params,
    compositeSlug,
    accountOptions = [],
    projectOptions = [],
    hasFetchProject = false,
    project = null;

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

  hasFetchProject = state.getIn(['project', 'projects']).has(compositeSlug);
  if(hasFetchProject) {
    project = state.getIn(['project', 'projects', compositeSlug]).toJS();
  }

  return {
    isFetching: state.getIn(['project', 'isFetching']),
    hasFetched: hasFetchProject,
    project: project,
  };
}

export default connect(mapStateToProps)(Project);
