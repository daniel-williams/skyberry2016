import React, {PropTypes} from 'react';
import classnames from 'classnames';
import {Row, Col} from 'react-bootstrap';

import ImageLoader from './ImageLoader';
require('./Staff.less');


export default React.createClass({
  displayName: 'Staff',

  propTypes: {
    name: PropTypes.string,
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    links: PropTypes.object,
  },
  getDefaultProps: function() {
    return {
      name: 'Full Name',
      title: 'Title',
      imgSrc: '',
      object: {},
    };
  },

  render: function() {
    return (
      <section className='staff'>
        <Row>
          <Col sm={6} xs={12}>
            {this.renderImage()}
          </Col>
          <Col sm={6} xs={12}>
            <h1 className='name nowrap'>{this.props.name}</h1>
            <h4 className='title'>{this.props.title}</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} align='justify'>
            {this.props.children}
          </Col>
        </Row>
      </section>
    );
  },

  renderImage: function() {
    if(this.props.imgSrc) {
      return (
        <ImageLoader src={this.props.imgSrc} className='staff-img' />
      );
    }
  },

});
