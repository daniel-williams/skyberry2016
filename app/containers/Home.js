import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/featuredActionCreators';
import Home from '../pages/Home';


function mapStateToProps(state) {
  return {
    featured: state.get('featured').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Home);
