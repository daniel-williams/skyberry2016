import React, {PropTypes} from 'react';

export default React.createClass({
  hasAccounts: function() {
    return this.props.accounts.items && this.props.accounts.items.length > 0;
  },
  getAccounts: function() {
    return this.props.accounts.items || [];
  },
  render: function() {
    return (
      <div id='dashboard'>
        {this.hasAccounts() && this.renderAccounts()}
        {this.props.children}
      </div>
    );
  },

  renderAccounts: function() {
    return this.getAccounts().map((item, i) => <div key={i}>{item.name}</div>);
  }

});
