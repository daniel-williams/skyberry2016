import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixin: [PureRender],

  propTypes: {
    name: PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <i className={'icon-' + this.props.name} {...this.props}>
        {this.props.children}
      </i>
    );
  },

});
