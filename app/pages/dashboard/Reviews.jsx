import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import {Row, Col} from 'react-bootstrap';

const NO_ITEMS = <p className='no-items'>no reviews found...</p>;

export default React.createClass({
  displayName: 'Reviews',

  mixins: [PureRender],

  propTypes: {
    items: PropTypes.array,
    rootUrl: PropTypes.string.isRequired,
  },
  getDefaultProps: function() {
    return {
      items: [],
    };
  },
  hasItems: function() {
    return !!this.props.items.length;
  },

  render: function() {
    return (
      <div {...this.props} className='design-reviews link-set'>
        <h4 className='title'>Design Reviews</h4>
        {this.hasItems()
          ? this.renderItems()
          : NO_ITEMS
        }
      </div>
    );
  },
  renderItems: function() {
    return this.props.items.map((item, i) => {
      return (
        <div key={i} className='item'>
          <Link to={'/dashboard/projects' + this.props.rootUrl + item.slug}>{item.title}</Link>
        </div>
      );
    });
  },

});
