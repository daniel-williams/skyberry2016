import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/testingActionCreators';


const OAuthTest = React.createClass({
  isAuthenticated: function() {
    return this.props.identity.isAuthenticated === true;
  },
  getRefreshToken: function() {
    return this.props.identity.refreshToken || '';
  },
  render: function() {
    return (
      <div id='oauth-test' className='mt-dbl'>
        <h3>testing will ensue</h3>
        <div className='mt'>
          <div>Authenticated: {this.isAuthenticated() ? 'yes': 'no'}</div>
          <div>Refresh Token: {this.getRefreshToken()}</div>
          <div>Access Token: {this.props.identity.accessToken}</div>
          <div>Issued: {this.props.identity.issued.toString()}</div>
          <div>Expires: {this.props.identity.expires.toString()}</div>

        </div>
        <div className='mt'>
          <button
            type='button'
            onClick={this.handleRefresh}
            disabled={!this.isAuthenticated()}
            className='btn btn-sky'>Refresh</button>
        </div>
        <div className='mt-trpl'>
          <h3>User Details</h3>
          <div>First Name: {this.props.user.firstName}</div>
          <div>Last Name: {this.props.user.lastName}</div>
          <div>Email: {this.props.user.email}</div>
        </div>
      </div>
    );
  },

  handleRefresh: function() {
    this.props.testRefreshToken(this.getRefreshToken());
  },
});

function mapStateToProps(state) {
  return {
    identity: state.get('identity').toJS(),
    user: state.get('user').toJS(),
  };
}

export default connect(mapStateToProps, actions)(OAuthTest);
