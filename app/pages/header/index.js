import React from 'react';

import Nav from './Nav';
require('./header.less');


export default React.createClass({
  render: function() {
    return (
      <div id='header'>
        <Nav {...this.props}/>
      </div>
    );
  },

});
