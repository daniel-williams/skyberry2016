import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import constants from '../constants';
import {Fetching, ImageBoard, Select} from '../components';
require('./Portfolio.less');


export default React.createClass({

  isFetching: function() {
    return this.props.portfolio.isFetching;
  },
  componentDidMount: function() {
    this.props.switchPortfolio(constants.portfolio.default);
  },

  render: function () {
    return (
      <div id='portfolio'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12} align='center'>
              <h1>Featured Works</h1>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={3} className='hidden-xs'></Col>
            <Select
              options={constants.portfolio.options}
              className='col-md-4 col-sm-6 col-xs-12'
              onChange={this.handleChange} />
            <Col md={4} sm={3} className='hidden-xs'></Col>
          </Row>
          <Row>
            <Col xs={12}>
              {this.isFetching() && <Fetching /> || this.renderPortfolio()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },

  renderPortfolio: function() {
    const images = this.props.portfolio.collections[this.props.portfolio.key];
    if(images) {
      return <ImageBoard images={images} columns={{xxs:1,xs:2,sm:2,md:3,lg:4}} />;
    }
  },

  handleChange: function(event)  {
    var key = event.target.value;
    if(key != this.props.portfolio.key) {
      this.props.switchPortfolio(key);
    }
  },

});
