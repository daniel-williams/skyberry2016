import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

// import * as actions from '../actions/projectActionCreators';
import Preferences from '../pages/dashboard/Preferences';


function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(Preferences);
