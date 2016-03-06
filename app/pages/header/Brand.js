import React, {PropTypes} from 'react';
import {Link} from 'react-router';

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
    let item = this.props.src ? <ImageLoader src={this.props.src} style={{maxHeight:'103px'}} alt={this.props.title} />
                              : <span>{this.props.title}</span>;
    return <Link to='/'><h1 {...this.props}>{item}</h1></Link>;
  },

});
