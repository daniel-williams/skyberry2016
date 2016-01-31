import React, {PropTypes} from 'react';

require('./Dashboard.less');


export default React.createClass({
  displayName: 'Dashboard',

  render: function() {
    return (
      <div id='dashboard' className='mt'>
        {this.props.children}
      </div>
    );
  },

});
