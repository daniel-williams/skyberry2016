import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';

import {Article} from '.';


export default React.createClass({
  displayName: 'ArticleList',

  mixins: [PureRender],

  propTypes: {
    items: PropTypes.array,
  },
  getDefaultProps: function() {
    return {
      items: [],
    };
  },
  render: function() {
    return (
      <div className='article-list'>
        {this.props.items.map((item, idx) => <Article key={item.slug} item={item} />)}
      </div>
    );
  },

});
