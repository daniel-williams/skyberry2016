import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Dashboard from '../pages/Dashboard';


function mapStateToProps(state) {
  return {
    user: state.get('user').toJS(),
    accounts: state.get('accounts').toJS(),
  };
}

export default connect(mapStateToProps)(Dashboard);
