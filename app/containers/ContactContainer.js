import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/contactActionCreators';
import Contact from '../pages/Contact';


function mapStateToProps(state) {
  return {
    contact: state.get('contact').toJS(),
    user: state.get('user').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Contact);
