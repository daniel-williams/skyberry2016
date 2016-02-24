import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default React.createClass({
  render: function() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12}>
            <h1>Settings</h1>
          </Col>
        </Row>
      </Grid>
    );
  },

});
