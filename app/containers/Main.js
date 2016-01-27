import React from 'react';
import {connect} from 'react-redux';

import {dump} from '../actions/identityActionCreators';
import Main from '../pages/Main';


const actions = {
  dump,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['identity', 'isAuthenticated']),
  };
}

export default connect(mapStateToProps, actions)(Main);
