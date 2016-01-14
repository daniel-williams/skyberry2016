import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import constants from '../constants';
import * as actions from '../actions/subscribeActionCreators';

import {Subscribe} from '../components';
// import Header from '../pages/header';
// import Footer from '../pages/footer';

import Bootstrap from '../../Web/content/styles/bootstrap.min.css';
require('../site.less');
require('../fonts');


let subscribeTimer = null;
let subscribeDelay = constants.subscribeDelay;

const Root = React.createClass({
  componentDidMount: function() {
    subscribeTimer = setTimeout(actions.showSubscribe, subscribeDelay);
  },
  componentWillUnmount: function() {
    if(subscribeTimer) {
      clearTimeout(subscribeTimer);
    }
  },
  render: function() {
    return (
      <div id='root'>
        <div>ima header when I grow up</div>
        <div id='page-wrap'>
          {this.props.children}
        </div>
        <div>ima footer when I grow up</div>
        <Subscribe {...this.props} />
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
