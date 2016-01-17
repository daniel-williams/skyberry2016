import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/subscribeActionCreators';
import {Subscribe} from '../components';
import constants from '../constants';

import Bootstrap from '../../Web/content/styles/bootstrap.min.css';
require('../site.less');
require('../utils/FontLoader');


let subscribeTimer = null;
const {active, delay} = constants.subscribe;

const Root = React.createClass({
  displayName: 'Root',

  componentDidMount: function() {
    if(active) {
      subscribeTimer = setTimeout(this.props.showSubscribe, delay);
    }
  },
  componentWillUnmount: function() {
    if(subscribeTimer) {
      clearTimeout(subscribeTimer);
    }
  },
  render: function() {
    return (
      <div id='root'>
        {this.props.children}
        {active && <Subscribe {...this.props} />}
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    subscribe: state.get('subscribe'),
  };
}

export default connect(mapStateToProps, actions)(Root);
