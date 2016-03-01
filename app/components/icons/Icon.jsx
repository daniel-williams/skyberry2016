import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default React.createClass({
  mixin: [PureRender],

  propTypes: {
    name: PropTypes.string,
  },

  hasName: function() {
    return !!this.props.name;
  },

  render: function() {
    const iconName = this.hasName()
      ? 'icon-' + this.props.name
      : '';

    const cssNames = classnames('sky-icon', this.props.className, iconName);
    return (
      <i {...this.props} className={cssNames}>
        {this.props.children}
      </i>
    );
  },

});
