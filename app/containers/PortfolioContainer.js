import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/portfolioActionCreators';
import Portfolio from '../pages/Portfolio';


function mapStateToProps(state) {
  return {
    portfolio: state.get('portfolio').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Portfolio);
