import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';


const NO_ITEMS = <p className='no-items'>no deliverables found...</p>;

export default React.createClass({
    displayName: 'Deliverables',

    mixins: [PureRender],

    propTypes: {
      items: PropTypes.array,
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
          <div {...this.props} className='design-deliverables link-set'>
              <h4 className='title'>Deliverables</h4>
              {this.hasItems() ? this.renderItems() : NO_ITEMS}
          </div>
      );
    },
    renderItems: function() {
      return this.props.items.map((item, i) => {
        return (
          <div key={i} className='item'>
            <a href={`/api/documents/${item.id}`}>{item.title}</a>
          </div>
        );
      });
    },

});
