import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {Fetching, Selector} from '../../../components';


export default React.createClass({
  getDefaultProps: function() {
    return {
    }
  },
  getAccountCount: function() {
    return this.props.accounts.items.length;
  },
  getAccountOptions: function() {
    return this.props.accounts.items.map(item => {
      return {
        name: item.name,
        value: item.id,
      };
    });
  },
  getSelectedAccount: function() {
    return this.props.accounts.selected || '';
  },
  render: function() {
    const accountCount = this.getAccountCount();
    return (
      <div id='dashboard-header'>
        {!this.props.accounts.hasFetched && <Fetching />}
        {accountCount > 1 ? this.renderAccountSelector()
                         : accountCount === 1 ? this.renderAccountTitle()
                                              : this.renderNoAccounts()}
      </div>
    );
  },

  renderAccountSelector: function() {
    return (
      <Row>
        <Col xs={12}>
          <Selector
            label='Accounts'
            options={this.getAccountOptions()}
            selected={this.getSelectedAccount()}
            onChange={this.props.setSelectedAccount} />
        </Col>
      </Row>
    );
  },
  renderAccountTitle: function() {
    const account = this.props.accounts.items[0];
    return <h3>{account.name}</h3>;
  },
  renderNoAccounts: function() {
    return <h3>Account not found</h3>;
  }

});
