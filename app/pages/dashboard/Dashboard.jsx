import React, {PropTypes} from 'react';
import {Grid} from 'react-bootstrap';

import Selectors from './Selectors';


export default React.createClass({
  render: function() {
    return (
      <div id='dashboard'>
        <Grid fluid={true}>
          <Selectors
            hasFetched={this.props.hasFetchedAccounts}
            accountOptions={this.props.accountOptions}
            selectedAccount={this.props.selectedAccount}
            projectOptions={this.props.projectOptions}
            selectedProject={this.props.selectedProject}
            setAccount={this.props.setSelectedAccount}
            setProject={this.props.setSelectedProject} />
          {this.props.children}
        </Grid>
      </div>
    );
  },

});
