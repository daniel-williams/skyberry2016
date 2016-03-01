import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import './SkyButton.less';


export default React.createClass({
  displayName: 'SkyButton',

  mixins: [PureRender],

  propTypes: {
    type: PropTypes.oneOf(['button', 'submit', 'clear']),
    isPrimary: PropTypes.bool,
    size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      type: 'button',
      isPrimary: false,
      size: 'md',
      isDisabled: false,
      onClick: this.Noop,//function() {},
    };
  },

  getSize: function() {
    return 'btn-' + this.props.size;
  },
  isPrimary: function() {
    return this.props.isPrimary === true;
  },
  isDefault: function() {
    return this.props.isPrimary !== true;
  },

  render: function() {
    const cssNames = classnames('btn', 'btn-sky', this.getSize(), this.props.className, {
      'primary': this.isPrimary(),
      'default': this.isDefault(),
      disabled: this.props.isDisabled,
    });
    const title = this.props.isDisabled ? 'disabled' : this.props.title || '';

    return (
      <button
        type={this.props.type}
        className={cssNames}
        title={title}
        onClick={this.props.isDisabled
          ? this.Noop
          : this.props.onClick}>{this.props.children}</button>
    );
  },

  Noop: function(e) {
    e.preventDefault();
    e.stopPropagation();
  },

});
