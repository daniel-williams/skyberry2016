import React, {PropTypes} from 'react';
import {Grid} from 'react-bootstrap';

import Header from './header';


export default React.createClass({

  render: function() {
    return (
      <div id='dashboard'>
        <Grid fluid={true}>
          <Header {...this.props} />
          {this.props.children}
        </Grid>
      </div>
    );
  },

});
