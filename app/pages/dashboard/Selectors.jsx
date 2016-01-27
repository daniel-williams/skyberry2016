import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {Fetching, Selector} from '../../components';


const NO_PROJECTS_FOUND = [
  {name: 'No projects found.', value: ''}
];

export default React.createClass({
  displayName: 'Selectors',
  mixins: [PureRender],
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
  getProjectOptions: function() {
    return this.props.projectOptions.length > 0 ?
      this.props.projectOptions :
      NO_PROJECTS_FOUND;
  },

  render: function() {
    return this.props.hasFetched ? this.renderSelectors()
                                 : <Fetching />;
  },
  renderSelectors: function() {
    return (
      <div className='controls'>
        {this.props.accountOptions.length > 1 && this.renderAccountSelector()}
        <Row>
          <div className='form-inline col col-xs-12  mb-half'>
            <Selector
              label='Projects'
              options={this.getProjectOptions()}
              selected={this.props.selectedProject}
              onChange={this.props.setProject} />
          </div>
        </Row>
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

});
