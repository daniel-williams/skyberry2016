import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {Fetching} from '../../components';
import Selectors from './Selectors';
require('./Dashboard.less');


export default React.createClass({
  hasAccounts: function() {
    return this.props.hasFetchedAccounts && this.props.accountOptions.length;
  },
  getSelectedAccountName: function() {
    let name = this.props.accountOptions[0].name
    try {
      name = this.props.accountOptions.find((item) => item.value === this.props.selectedAccount).name;
    } catch(e) {}
    return name;
  },
  render: function() {
    return (
      <div id='dashboard' className='mt'>
        {this.hasAccounts() ? this.renderSelectors()
                            : <Fetching />}
      </div>
    );
  },
  renderSelectors: function() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12}>
            <h1><span>Projects</span><span className="accent"> for </span><span className="nowrap">{this.getSelectedAccountName()}</span></h1>
          </Col>
        </Row>
        <Selectors
          hasFetched={this.props.hasFetchedAccounts}
          accountOptions={this.props.accountOptions}
          selectedAccount={this.props.selectedAccount}
          projectOptions={this.props.projectOptions}
          selectedProject={this.props.selectedProject}
          setAccount={this.props.setSelectedAccount}
          setProject={this.props.setSelectedProject} />
        {this.props.children}
      </Grid>
    );
  },
});
