import React, {PropTypes} from 'react';

import OAuthTest from '../containers/OAuthTest';

export default React.createClass({
  render: function() {
    return (
      <div id='dashboard'>
        <OAuthTest />
        {this.props.children}
      </div>
    );
  },

});
