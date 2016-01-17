import React from 'react';

import Header from './header/index';
import Footer from './footer';

export default React.createClass({

  render: function() {
    return (
      <div id='main'>
        <Header {...this.props}/>
        <div id='page-wrap'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  },
});
