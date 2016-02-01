import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Dashboard from '../pages/dashboard/Dashboard';


function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(Dashboard);
