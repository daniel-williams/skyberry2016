import React, {PropTypes} from 'react';
import {Grid} from 'react-bootstrap';

require('./CoverBillboard.less');


export default React.createClass({
  displayName: 'CoverBillboard',

  propTypes: {
    imgSrc: PropTypes.string.isRequired,
    posX: PropTypes.number,
    posY: PropTypes.number,
    overlayOpacity: PropTypes.number,
    overlayColor: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      posX: 50,
      posY: 50,
      overlayOpacity: 0,
      overlayColor: '#fff',
    };
  },
  hasOverlay: function() {
    return this.props.overlayOpacity > 0;
  },
  getOverlay: function() {
    return this.props.overlayOpacity === 100 ? 1.0 : `0.${this.props.overlayOpacity}`;
  },

  render: function() {
    const imgSrc = this.props.imgSrc;
    const imgUrl = 'url(' + imgSrc + ')';
    const style = {
      backgroundImage: imgUrl,
      backgroundPosition: `${this.props.posX}% ${this.props.posY}%`,
    };


    return (
      <div className='sky cover-billboard' style={style}>
        <Grid fluid={true} style={{position:'relative',zIndex:20}}>
          {this.props.children}
        </Grid>
        {this.hasOverlay() && this.renderOverlay()}
      </div>
    );
  },

  renderOverlay: function() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: this.props.overlayColor,
      opacity: this.getOverlay(),
      zIndex: 10,
    };

    return <div style={style}></div>
  },

});
