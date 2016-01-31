import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/billingActionCreators';
import Billing from '../pages/dashboard/Billing';


function mapStateToProps(state, ownProps) {
  let {aSlug} = ownProps.params,
    accountOptions = [],
    hasFetchedAccounts = state.getIn(['account', 'hasFetched']),
    accountSlug;

  if(hasFetchedAccounts) {
    try {
      accountOptions = state.getIn(['account', 'accountOptions']).toJS();
    } catch(e) {}

    if(accountOptions.find(item => item.value === aSlug)) {
      accountSlug = aSlug;
    } else {
      accountSlug = accountOptions.length ? accountOptions[0].value : null;
    }
  }

  return {
    isFetching: state.getIn(['account', 'isFetching']),
    hasFetchedAccounts: hasFetchedAccounts,
    accountOptions: accountOptions,
    accountSlug: accountSlug,
  };
}

export default connect(mapStateToProps, actions)(Billing);
