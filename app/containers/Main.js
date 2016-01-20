import React from 'react';
import {connect} from 'react-redux';

import Main from '../pages/Main';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['identity', 'isAuthenticated']),
  };
}

export default connect(mapStateToProps)(Main);
