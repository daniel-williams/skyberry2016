import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootsrap';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'OptionSelector',

  mixins: [PureRender],

  propTypes: {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    viewingKey: PropTypes.string,
    selectedKey: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      items: [],
    };
  },
  hasOptions: function() {
    return !!this.props.items.length;
  },
  render: function() {
    <div className='mt-dbl mb'>
        <h2>Design Options</h2>
        <div className='options clearfix'>
            {this.hasOptions() ? this.renderOptions() : <span className='not-found'>No options found.</span>}
        </div>
    </div>
  },
  renderOptions: function() {
    return this.props.items.map(function(item) {
      var cssnames = classnames('item', {
        selected: item.key === this.props.selectedKey,
        viewing: item.key === this.props.viewingKey,
      });
      return (
        <div key={id} data-key={id} className={cssnames} onClick={this.handleViewOption}>
          <div>
            {item.title}
          </div>
        </div>
      );
    });
  },

});
