import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Home from '../pages/Home';
import * as consultationActions from '../actions/consultationActionCreators';
import * as featuredActions from '../actions/featuredActionCreators';
import * as testimonialActions from '../actions/testimonialActionCreators';


const actions = Object.assign({}, consultationActions, featuredActions, testimonialActions);

function mapStateToProps(state) {
  return {
    consultation: state.get('consultation').toJS(),
    featured: state.get('featured').toJS(),
    testimonial: state.get('testimonial').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Home);
