import React from 'react';
import {Grid} from 'react-bootstrap';
import {toJS} from 'immutable';

import constants from '../constants';
import {CoverBillboard, ModalBox, ImageBoard, ImageLoader, SkyButton, SkyPlayer} from '../components';


export default React.createClass({
  displayName: 'Home',

  hasFeaturedItems: function() {
    return this.props.featured.items.length > 0;
  },
  getFeaturedItems: function() {
    return this.props.featured.items;
  },
  getTestimonials: function() {
    return this.props.testimonial.items.map(item =>
      <div className='quote'>
        <span className='before'><ImageLoader src='/content/images/quote.png' className='img-responsive' /></span>
        <span className='blockquote' dangerouslySetInnerHTML={{__html:item}} />
        <span className='after'><ImageLoader src='/content/images/quote.png' className='img-responsive' /></span>
      </div>
    );
  },

  componentDidMount: function() {
    if(!this.props.featured.hasFetched && !this.props.featured.isFetching) {
      this.props.fetchFeatured();
    }
    if(!this.props.testimonial.hasFetched && !this.props.testimonial.isFetching) {
      this.props.fetchTestimonials();
    }
  },

  render: function() {
    return (
      <div id='Home'>
        {this.renderBillboard()}
        {this.renderFeaturedItems()}
        {this.renderTestimonials()}
      </div>
    );
  },

  renderBillboard: function() {
    return (
      <CoverBillboard imgSrc={constants.routes.images + 'jumbo1.jpg'}>
        <ModalBox headline='Graphic Design & Web Development' overlay={true}>
          <p>Skyberry Studio is a full-service, award winning, desgin and development company. We are experts in brand identity, logo design, graphic design and web application development.</p>
          <SkyButton
            isPrimary
            size='lg'
            onClick={() => console.log('clickie click!')}>Get your Free Project Consultation</SkyButton>
        </ModalBox>
      </CoverBillboard>
    );
  },

  renderFeaturedItems: function() {
    if(!this.hasFeaturedItems()) { return false; }

    return (
      <Grid fluid={true} className='mt mb-dbl'>
        <ImageBoard
          images={this.getFeaturedItems()}
          headline='Full Service From Print to Web' />
      </Grid>
    );
  },

  renderTestimonials: function() {
    return (
      <CoverBillboard imgSrc={constants.routes.images + 'jumbo3.jpg'} className='mt'>
        <div id='testimonials'>
          <SkyPlayer items={this.getTestimonials()} duration={15000} />
        </div>
      </CoverBillboard>
    );
  },

});
