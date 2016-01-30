import React, {PropTypes} from 'react';
import {Grid} from 'react-bootstrap';

require('./CoverBillboard.less');


export default React.createClass({
  displayName: 'CoverBillboard',

  propTypes: {
    imgSrc: PropTypes.string.isRequired,
  },

  render: function() {
    var imgSrc = this.props.imgSrc;
    var imgUrl = 'url(' + imgSrc + ')';
    var style = {backgroundImage: imgUrl};

    return (
      <div className='sky cover-billboard' style={style}>
        <Grid fluid={false}>
          {this.props.children}
        </Grid>
      </div>
    );
  },

});
