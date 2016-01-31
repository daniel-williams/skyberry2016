import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {Fetching} from '../../components';
import AccountSelector from './AccountSelector';
import ProjectSelector from './ProjectSelector';


export default React.createClass({
  displayName: 'Projects',

  componentWillMount: function() {
    this.fetchAsNeeded();
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching) {
      this.fetchAsNeeded(nextProps);
    }
  },
  fetchAsNeeded: function(specificProps) {
    const props = specificProps || this.props;
    if(!props.isFetching && !props.hasFetchedProject && !!props.compositeSlug) {
      props.fetchProjectAsNeeded(props.compositeSlug);
    }
  },
  isFetching: function() {
    return this.props.isFetching;
  },
  getSelectedAccountName: function() {
    return 'TODO';
  },
  hasAccountOptions: function() {
    return this.props.accountOptions.length > 1;
  },
  render: function() {
    return (
      <div id='project' className='mt'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <h1><span>Projects</span><span className="accent"> for </span><span className="nowrap">{this.getSelectedAccountName()}</span></h1>
            </Col>
          </Row>
          {this.hasAccountOptions() && this.renderAccountSelector()}
          {this.renderProjectSelector()}
          <Row>
            <Col xs={12}>
              {this.isFetching() ? <Fetching /> : this.props.hasFetchedProject && this.renderProjectInfo()}
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
  renderProjectSelector: function() {
    return (
      <ProjectSelector
        hasFetched={this.props.hasFetchedAccounts}
        projectOptions={this.props.projectOptions}
        projectSlug={this.props.compositeSlug}
        changeProject={this.props.changeProject} />
    );
  },
  renderProjectInfo: function() {
    return (
      <div>
        <h3>{this.props.project.name}</h3>
        <p>{this.props.project.description}</p>
      </div>
    );
  },

});
