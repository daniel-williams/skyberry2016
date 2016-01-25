import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {Fetching, Selector} from '../../components';


export default React.createClass({
  propTypes: {
    hasFetched: PropTypes.bool,
    accountOptions: PropTypes.array,
    selectedAccount: PropTypes.string,
    projectOptions: PropTypes.array,
    selectedProject: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      hasFetched: false,
      accountOptions: [],
      projectOptions: [],
    }
  },
  getAccountCount: function() {
    return this.props.accountOptions.length;
  },
  getProjectCount: function() {
    return this.props.projectOptions.length;
  },

  render: function() {
    return this.props.hasFetched ? this.renderSelectors()
                                 : <Fetching />;
  },

  renderSelectors: function() {
    const accountCount = this.getAccountCount();
    const projectCount = this.getProjectCount();
    return (
      <div id='dashboard-selectors'>
        <Row>
          <Col xs={12}>
            {accountCount > 1 ? this.renderAccountSelector()
              : accountCount === 1 ? this.renderAccountTitle()
              : this.renderNoAccounts()}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {projectCount > 1 ? this.renderProjectSelector()
              : projectCount === 1 ? this.renderProjectTitle()
              : this.renderNoProjects()}
          </Col>
        </Row>
      </div>
    );
  },

  renderAccountSelector: function() {
    return (
      <Selector
        label='Accounts'
        options={this.props.accountOptions}
        selected={this.props.selectedAccount}
        onChange={this.props.setAccount} />
    );
  },
  renderAccountTitle: function() {
    return <h3>{accountOptions[0].name}</h3>;
  },
  renderNoAccounts: function() {
    return <h3>Account not found</h3>;
  },

  renderProjectSelector: function() {
    return (
      <Selector
        label='Projects'
        options={this.props.projectOptions}
        selected={this.props.selectedProject}
        onChange={this.props.setProject} />
    );
  },
  renderProjectTitle: function() {
    return <h3>{projectOptions[0].name}</h3>;
  },
  renderNoProjects: function() {
    return <h3>Project not found</h3>;
  },

});
