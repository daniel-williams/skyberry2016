import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {toJS} from 'immutable';

import constants from '../constants';
import {CoverBillboard, ModalBox, ImageBoard, ImageLoader, SkyButton, SkyPlayer} from '../components';
import {shuffle} from '../utils/CollectionUtils';
import Consultation from './Consultation';


export default React.createClass({
  displayName: 'Home',

  getInitialState: function() {
    return {
      isConsultationVisible: false,
    };
  },

  hasFeaturedItems: function() {
    return this.props.featured.items.length > 0;
  },
  getFeaturedItems: function() {
    return this.props.featured.items;
  },
  hasTestimonials: function() {
    return this.props.testimonial.items.length > 0;
  },
  getTestimonials: function() {
    if(!this.hasTestimonials()) { return []; }
    // const testimonials = ['looks great - thanks'];
    const testimonials = shuffle(this.props.testimonial.items.slice(0));
    return testimonials.map(item => { return item.replace(/["]/g,''); }).map(item => { return item.replace(/ - /g, '<br />- ')}).map(item =>
      <div className='quote'>
        <div className='quote-inner'>
          <span className='before'><ImageLoader src='/content/images/quote.png' /></span>
          <span className='blockquote' dangerouslySetInnerHTML={{__html:item}} />
          <span className='after'><ImageLoader src='/content/images/quote.png' /></span>
        </div>
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
        {this.renderServices()}
        {this.renderRelax()}
      </div>
    );
  },

  renderBillboard: function() {
    return (
      <CoverBillboard imgSrc={constants.routes.images + 'jumbo5.jpg'} posY={70} overlayOpacity={30} overlayColor='#fff'>
        <ModalBox headline='Graphic Design & Web Development' overlay={true}>
          <p>Skyberry Studio is a full-service, award winning, design and development company. We are experts in brand identity, logo design, graphic design and web application development.</p>
          <SkyButton
            isPrimary
            size='lg'
            onClick={this.toggleConsultation}>Get your Free Project Consultation</SkyButton>
        </ModalBox>
      </CoverBillboard>
    );
  },

  renderFeaturedItems: function() {
    if(!this.hasFeaturedItems()) { return false; }

    return (
      <section id='featured'>
        <Grid fluid={true} className='mt-dbl'>
          <Row>
            <Col xs={12}>
              <h1 className='ttl'>Featured Work</h1>
            </Col>
            <Col xs={12}>
              <p>Skyberry Studio produces award winning graphic design and state of the art websites. Have a look at our <Link to='/portfolio'>portfolio</Link>.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='mt'>
              <ImageBoard
                images={this.getFeaturedItems()}
                headline='Full Service From Print to Web' />
            </Col>
          </Row>
        </Grid>
      </section>
    );
  },

  renderTestimonials: function() {
    if(!this.hasTestimonials()) { return false; }

    return (
      <section id='testimonials' className='mt-dbl'>
        <CoverBillboard imgSrc={constants.routes.images + 'jumbo3.jpg'} posY={30}  overlayOpacity={65} overlayColor='#fff' className='mt'>
          <div className='player-wrap-outer'>
          <div className='player-wrap-inner'>
            <SkyPlayer items={this.getTestimonials()} duration={15000} />
          </div>
          </div>
        </CoverBillboard>
      </section>
    );
  },

  renderServices: function() {
    return (
      <section id='services' className='mt-dbl'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <h1 className='ttl'>Design and Development Services</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <Row>
                <Col sm={6} xs={12} className='service'>
                  <h2 className='ttl'>Branding & Logo Design</h2>
                  <div className='img-button'><ImageLoader src='/content/images/services-branding-logo-design.png' /></div>
                  <p>We build successful brands, starting with a unique and unforgettable logo.  Each logo is handcrafted with the utmost care with the goal of longevity, brand versatility and memorability.</p>
                </Col>
                <Col sm={6} xs={12} className='service'>
                  <h2 className='ttl'>Graphic & Print Design</h2>
                  <div className='img-button'><ImageLoader src='/content/images/services-graphic-design-print-design.png' /></div>
                  <p>Skyberry produces hand drawn artwork and pixel perfect design created specifically for our clients unique needs. We design stationery, collateral, catalogs, posters, advertisements or anything else you might need.</p>
                </Col>
              </Row>
            </Col>
            <Col md={6} sm={12}>
              <Row>
                <Col sm={6} xs={12} className='service'>
                  <h2 className='ttl'>Website Design</h2>
                  <div className='img-button'><ImageLoader src='/content/images/services-website-design.png' /></div>
                  <p>Here, creative talent combines with technical know-how to create smart, responsive and user-friendly websites. Our custom designs are targeted to your audience and are based on the most up-to-date industry standards & trends.</p>
                </Col>
                <Col sm={6} xs={12} className='service'>
                  <h2 className='ttl'>Web Development & SEO</h2>
                  <div className='img-button'><ImageLoader src='/content/images/services-web-development-seo.png' /></div>
                  <p>With over 20 years experience, we develop custom websites and online stores with SEO baked in.  If you need more oomf, we also build full-blown web applications, easy-to-use content management systems (CMS) and secure portals.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  },

  renderRelax: function() {
    return (
      <section id='relax'>
        <CoverBillboard imgSrc={constants.routes.images + 'jumbo6.jpg'} posY={70} overlayOpacity={60}>
          <div className='relax-wrap'>
            <h1 className='ttl'>Relax, You'll Enjoy Working With Skyberry</h1>
            <p>Need a project done right? We go to great lengths to make you look like the hero! Many of Skyberry's clients came to us through referrals!</p>
            <div className='featured-clients'>
              <ImageLoader src='/content/images/featured-client-city-of-beaverton.png' />
              <ImageLoader src='/content/images/featured-client-clear-channel.png' />
              <ImageLoader src='/content/images/featured-client-strideline.png' />
              <ImageLoader src='/content/images/featured-client-napa-auto-parts.png' />
              <ImageLoader src='/content/images/featured-client-tedx.png' />
            </div>
          </div>
        </CoverBillboard>
      </section>
    );
  },


  toggleConsultation: function() {
    this.setState({
      isConsultationVisible: !this.state.isConsultationVisible,
    });
  },

});
