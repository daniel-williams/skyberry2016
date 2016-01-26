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

  render: function() {
    return this.props.hasFetched ? this.renderSelectors()
                                 : <Fetching />;
  },

  renderSelectors: function() {
    return (
      <div className='controls'>
        {this.props.accountOptions.length > 1 && this.renderAccountSelector()}
        {this.props.projectOptions.length > 0 ? this.renderProjectSelector()
                                              : this.renderNoProjects()}
      </div>
    );
  },

  renderAccountSelector: function() {
    return (
      <Row>
        <div className='form-inline col col-xs-12  mb-half'>
          <Selector
            label='Accounts'
            options={this.props.accountOptions}
            selected={this.props.selectedAccount}
            onChange={this.props.setAccount} />
        </div>
      </Row>
    );
  },

  renderProjectSelector: function() {
    return (
      <Row>
        <div className='form-inline col col-xs-12 mb-half'>
          <Selector
            label='Projects'
            options={this.props.projectOptions}
            selected={this.props.selectedProject}
            onChange={this.props.setProject} />
        </div>
      </Row>
    );
  },
  renderNoProjects: function() {
    return <h3>Project not found</h3>;
  },

});
