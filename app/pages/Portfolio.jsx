import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {Fetching, ImageBoard, Select} from '../components';
require('./Portfolio.less');


export default React.createClass({

  isFetching: function() {
    return this.props.portfolio.isFetching;
  },
  componentWillMount: function() {
    if(!this.getImages()) {
      this.props.switchPortfolio(this.props.portfolio.selected);
    }
  },
  getImages: function() {
    return this.props.portfolio.collections[this.props.portfolio.selected];
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
            <Col md={4} sm={6} xs={12}>
              <Select
                options={this.props.portfolio.options}
                selected={this.props.portfolio.selected}
                onChange={this.handleChange}
                className='form-control'  />
            </Col>
            <Col md={4} sm={3} className='hidden-xs'></Col>
          </Row>
          <Row>
            <Col xs={12} className='mt'>
              {this.isFetching() && <Fetching /> || this.renderPortfolio()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },

  renderPortfolio: function() {
    const images = this.getImages();
    if(images) {
      return <ImageBoard images={images} columns={{xxs:1,xs:2,sm:3,md:4,lg:4}} />;
    }
  },

  handleChange: function(event)  {
    if(event.target.value != this.props.portfolio.selected) {
      this.props.switchPortfolio(event.target.value);
    }
  },

});
