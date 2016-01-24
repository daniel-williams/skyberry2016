import React from 'react';
import {Grid} from 'react-bootstrap';
import {toJS} from 'immutable';

import constants from '../constants';
import {CoverBillboard, ModalBox, ImageBoard} from '../components';


export default React.createClass({
  displayName: 'Home',

  hasFeaturedItems: function() {
    return this.props.featured.items.length > 0;
  },
  getFeaturedItems: function() {
    return this.props.featured.items;
  },
  // getTestimonialDescriptions: function() {
  //     return this.props.testimonials.toJS().map(item => item.description);
  // },

  componentDidMount: function() {
    if(!this.props.featured.hasFetched && !this.props.featured.isFetching) {
      this.props.fetchFeatured();
    }
  },

  render : function() {
    return (
      <div id='Home'>
        {this.renderBillboard()}
        {this.renderFeaturedItems()}
      </div>
    );
  },

  renderBillboard : function() {
    return (
      <CoverBillboard imgSrc={constants.routes.images + 'jumbo1.jpg'}>
        <ModalBox headline='Graphic Design & Web Development' overlay={true}>
          <p>Skyberry Studio is a full-service, award winning, desgin and development company. We are experts in brand identity, logo design, graphic design and web application development.</p>
          <button className='btn btn-sky'>Get your Free Project Consultation</button>
        </ModalBox>
      </CoverBillboard>
    );
  },

  renderFeaturedItems : function() {
    if(!this.hasFeaturedItems()) { return false; }

    return (
      <Grid fluid={false} className='mt mb-dbl'>
        <ImageBoard
          images={this.getFeaturedItems()}
          headline='Full Service From Print to Web' />
      </Grid>
    );
  },

});
