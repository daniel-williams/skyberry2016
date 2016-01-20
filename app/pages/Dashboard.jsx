import React, {PropTypes} from 'react';

export default React.createClass({
  render: function() {
    return (
      <div id='dashboard'>
        {this.props.children}
      </div>
    );
  },

});
