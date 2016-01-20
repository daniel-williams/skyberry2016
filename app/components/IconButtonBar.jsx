import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';

import Icon from './Icon';


export default React.createClass({
  displayName: 'IconButtonBar',

  mixins: [PureRender],

  propTypes: {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
    size: PropTypes.number,
  },
  getDefaultProps: function() {
    return {
      links: [
        {title: 'facebook', url: 'http://facebook.com'},
        {title: 'twitter', url: 'http://twitter.com'},
        {title: 'linkedin', url: 'http://linkedin.com'},
        {title: 'youtube', url: 'http://youtube.com'},
      ],
      size: 24,
    };
  },

  render: function() {
    const style = {fontSize: this.props.size};
    const items = this.props.links.map(item =>
      <a key={item.title} href={item.url} title={item.alt || 'Link to ' + item.title} target='_blank'>
        <Icon name={item.title} style={style} />
      </a>
    );

    return (
      <div className='icon-button-bar'>
        {items}
      </div>
    );
  },

});
