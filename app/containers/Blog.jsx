import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/blogActionCreators';
import Blog from '../pages/Blog';


function mapStateToProps(state) {
  return {
    blog: state.get('blog').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Blog);
