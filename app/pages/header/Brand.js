import React, {PropTypes} from 'react';

import {ImageLoader} from '../../components';


export default React.createClass({
  displayName: 'Brand',

  propTypes: {
    title: PropTypes.string,
    src: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title: 'LOGO HERE',
    };
  },

  render: function () {
    let item = this.props.src ? <ImageLoader src={this.props.src} style={{maxHeight:'100px'}} alt={this.props.title} />
                              : <span>{this.props.title}</span>;
    return <h1 {...this.props}>{item}</h1>;
  },

});
