import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {Fetching} from '../../components';


export default React.createClass({
  componentWillMount: function() {
    this.fetchAsNeeded();
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching) {
      this.fetchAsNeeded(nextProps);
    }
  },
  fetchAsNeeded: function(specificProps) {
    const props = specificProps || this.props;
    props.fetchProjectAsNeeded(props.compositeSlug);
  },
  isFetching: function() {
    return this.props.isFetching;
  },
  hasFetched: function() {
    return this.props.hasFetched === true;
  },
  render: function() {
    return (
      <div id='project' className='mt'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              {this.isFetching() ? <Fetching /> : this.hasFetched() && this.renderProjectInfo()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },
  renderProjectInfo: function() {
    return (
      <div>
        <h3>{this.props.project.name}</h3>
        <p>{this.props.project.description}</p>
      </div>
    );
  },

});
