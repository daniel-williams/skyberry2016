import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as billingActions from '../actions/billingActionCreators';
import * as accountActions from '../actions/accountActionCreators';
import Billing from '../pages/dashboard/Billing';

const actions = Object.assign({}, billingActions, accountActions);

function mapStateToProps(state, ownProps) {
  let {aSlug} = ownProps.params,
    accountOptions = [],
    hasFetchedAccounts = state.getIn(['account', 'hasFetched']),
    accountSlug,
    account;

  if(hasFetchedAccounts) {
    try {
      accountOptions = state.getIn(['account', 'accountOptions']).toJS();
    } catch(e) {}

    if(accountOptions.find(item => item.value === aSlug)) {
      accountSlug = aSlug;
    } else {
      accountSlug = accountOptions.length ? accountOptions[0].value : null;
    }
    account = state.getIn(['account', 'accountMap', accountSlug]).toJS();
  }

  return {
    isFetching: state.getIn(['account', 'isFetching']),
    isFetching: state.getIn(['account', 'isFetchingDetails']),
    hasFetchedAccounts: hasFetchedAccounts,
    accountOptions: accountOptions,
    accountSlug: accountSlug,
    account: account,
  };
}

export default connect(mapStateToProps, actions)(Billing);
