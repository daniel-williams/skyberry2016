import React from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Grid} from 'react-bootstrap';
import {toJS} from 'immutable';

import {CoverBillboard, ModalBox, ImageBoard} from '../components';


export default React.createClass({
  displayName: 'Home',
  mixins: [PureRender],

  hasFeaturedItems: function() {
    return this.props.featured.get('items').count() > 0;
  },
  getFeaturedItems: function() {
    return this.props.featured.get('items').toJS();
  },
  getTestimonialDescriptions: function() {
      return this.props.testimonials.toJS().map(item => item.description);
  },

  componentDidMount: function() {
    if(!this.props.featured.get('hasFetched') && !this.props.featured.get('isFetching')) {
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
      <CoverBillboard imgSrc='/content/images/jumbo1.jpg'>
        <ModalBox headline='Graphic Design & Web Development' overlay={true}>
          <p>Skyberry Studio is a full-service, award winning, desgin and development company. We are experts in brand identity, logo design, graphic design and web application development.</p>
          <button className='btn btn-sky'>Get your Free Project Consultation</button>
        </ModalBox>
      </CoverBillboard>
    );
  },

  renderFeaturedItems : function() {
    if(!this.hasFeaturedItems()) { return false; }
    const columns = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    };

    return (
      <Grid fluid={false} className='mb-trpl'>
        <ImageBoard
          images={this.getFeaturedItems()}
          headline='Full Service From Print to Web'
          columns={columns}/>
      </Grid>
    );
  },

});
