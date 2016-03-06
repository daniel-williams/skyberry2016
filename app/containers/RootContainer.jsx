import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import constants from '../constants';
import {promptToSubscribe, setPromptToSubscribe} from '../services/StorageService';
import {Subscribe} from '../components';
import * as identityActionCreators from '../actions/identityActionCreators';
import * as subscribeActionCreators from '../actions/subscribeActionCreators';

// import Bootstrap from '../../Web/content/styles/bootstrap.custom.min.css';
import Bootstrap from '../../Web/content/styles/bootstrap.min.css';
require('../site.less');
require('../utils/FontLoader');


const actions = Object.assign({}, identityActionCreators, subscribeActionCreators);

let subscribeTimer = null;
const {active, delay} = constants.subscribe;

const Root = React.createClass({
  displayName: 'Root',

  componentWillMount: function() {
    this.props.recoverIndentity();
  },
  componentDidMount: function() {
    if(promptToSubscribe() && active) {
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
        {active && this.renderSubscribe()}
      </div>
    );
  },
  renderSubscribe: function() {
    return (
      <Subscribe
        show={this.props.subscribe.show}
        subscribe={this.props.subscribe}
        onSubmit={this.props.postSubscribe}
        onClose={this.subscribeOnClose} />
    );
  },

  subscribeOnClose: function() {
    console.log('set next prompt');
    setPromptToSubscribe(true);
    this.props.hideSubscribe();
  },

});

function mapStateToProps(state) {
  return {
    subscribe: state.get('subscribe').toJS(),
  };
}

export default connect(mapStateToProps, actions)(Root);
