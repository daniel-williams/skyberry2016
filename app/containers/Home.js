import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as featuredActions from '../actions/featuredActionCreators';
import * as testimonialActions from '../actions/testimonialActionCreators';
import Home from '../pages/Home';

const actions = Object.assign({}, featuredActions, testimonialActions);

function mapStateToProps(state) {
  return {
    featured: state.get('featured').toJS(),
    testimonial: state.get('testimonial').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Home);
