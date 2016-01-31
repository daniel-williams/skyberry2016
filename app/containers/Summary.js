import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

// import * as actions from '../actions/projectActionCreators';
import Summary from '../pages/dashboard/Summary';


function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(Summary);
