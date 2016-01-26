import React from 'react';
import {connect} from 'react-redux';
import {Location} from 'react-router';
import {toJS} from 'immutable';

import * as actions from '../actions/redirectActions';


export function requireAuthentication(Component) {

  const AuthenticatedComponent = React.createClass({
    componentWillMount: function() {
      this.checkAuth(this.props);
    },
    componentWillReceiveProps: function(nextProps) {
      this.checkAuth(nextProps);
    },
    checkAuth: function(props) {
      if (props.identity.isAuthenticated !== true) {
        props.setNext(props.location.pathname);
        props.history.replaceState(null, '/dashboard/sign-in');
      }
    },
    isAuthenticated: function() {
      return this.props.identity.isAuthenticated === true;
    },
    render: function() {
      return this.isAuthenticated() && <Component {...this.props}/>;
    },

  });

  function mapStateToProps(state) {
    return {
      identity: state.get('identity').toJS(),
    };
  }

  return connect(mapStateToProps, actions)(AuthenticatedComponent);
}
