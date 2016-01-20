import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/contactActionCreators';
import Contact from '../pages/Contact';


function mapStateToProps(state) {
  return {
    contact: state.get('contact').toJS(),
    identity: state.get('identity').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Contact);
