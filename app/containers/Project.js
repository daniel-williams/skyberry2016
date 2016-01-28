import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Project from '../pages/dashboard/Project';



function mapStateToProps(state) {
  const projectKey = state.getIn(['project', 'selectedKey']);
  let project = null;
  if(projectKey) {
    try {
      project = state.getIn(['project', 'projects', projectKey]).toJS();
    } catch(e) {}
  }
  return {
    isFetching: state.getIn(['project', 'isFetching']),
    project: project,
  };
}

export default connect(mapStateToProps)(Project);
