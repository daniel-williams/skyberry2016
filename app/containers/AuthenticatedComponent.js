import React from 'react';
import {connect} from 'react-redux';
import {Location} from 'react-router';
import {toJS} from 'immutable';

import * as actions from '../actions/redirectActionCreators';


export function requireAuthentication(Component) {

  const AuthenticatedComponent = React.createClass({
    componentWillMount: function() {
      this.checkAuth();
    },
    componentWillReceiveProps: function(nextProps) {
      this.checkAuth();
    },
    checkAuth: function() {
      if (!this.isAuthenticated()) {
        this.props.setNextUrl(this.props.location.pathname);
        this.props.history.pushState(null, '/dashboard/sign-in');
      }
    },
    isAuthenticated: function() {
      return this.props.identity.isAuthenticated === true;
    },
    render: function() {
      return this.isAuthenticated() && <Component {...this.props}/>;
    },

  });

  const mapStateToProps = (state) => ({
    identity: state.get('identity').toJS(),
  });

  return connect(mapStateToProps, actions)(AuthenticatedComponent);
}
