import React, {PropTypes} from 'react';
import classnames from 'classnames';

require('./IconButtonBar.less');


export default React.createClass({
  displayName: 'IconButtonBar',

  propTypes: {
    links: PropTypes.array,
    size: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      links: [{
        title: 'facebook',
        url: 'http://facebook.com'
      },
      {
        title: 'twitter',
        url: 'http://twitter.com'
      },
      {
        title: 'linkedin',
        url: 'http://linkedin.com'
      },
      {
        title: 'youtube',
        url: 'http://youtube.com'
      }],
      size: '24px'
    };
  },
  getInitialState: function() {
    return {};
  },

  render: function() {

    var items = this.props.links.map(function(item, i) {
      if(!(item.title && item.url)) {
        return;
      }
      var alt = item.alt || 'Link to ' + item.title;

      return (
        <a key={i} href={item.url} title={alt} target='_blank'>
          <i className={'icon-' + item.title} style={{fontSize:this.props.size}}></i>
        </a>
      );
    }.bind(this));

    return (
      <div className='sky icon-button-bar'>
        {items}
      </div>
    );
  },

});
