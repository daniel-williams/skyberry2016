import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

// import * as actions from '../actions/projectActionCreators';
import Settings from '../pages/dashboard/Settings';


function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(Settings);
