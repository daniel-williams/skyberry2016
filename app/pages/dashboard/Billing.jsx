import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';

import {Fetching} from '../../components';
import AccountSelector from './AccountSelector';


export default React.createClass({
  displayName: 'Billing',

  mixins: [PureRender],

  componentWillMount: function() {
    this.fetchAsNeeded();
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching) {
      this.fetchAsNeeded(nextProps);
    }
  },
  fetchAsNeeded: function(useProps) {
    const props = useProps || this.props;
    if(!props.isFetching && !props.hasFetchedProject && !!props.accountSlug) {
      props.fetchAccountAsNeeded(props.accountSlug);
    }
  },
  isFetching: function() {
    return this.props.isFetching || this.props.isFetchingDetails;
  },
  getSelectedAccountName: function() {
    return this.props.account
      ? this.props.account.name
      : '';
  },
  hasAccountOptions: function() {
    return this.props.accountOptions.length > 1;
  },
  render: function() {
    return (
      <div id='billing' className='mt'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <h1><span>Billing</span><span className="accent"> for </span><span className="nowrap">{this.getSelectedAccountName()}</span></h1>
            </Col>
          </Row>
          {this.hasAccountOptions() && this.renderAccountSelector()}
          <Row>
            <Col xs={12} className='mt'>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },
  renderAccountSelector: function() {
    return (
      <AccountSelector
        hasFetched={this.props.hasFetchedAccounts}
        accountOptions={this.props.accountOptions}
        accountSlug={this.props.accountSlug}
        changeAccount={this.props.changeAccount} />
    );
  },

});
