import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';

import {Select} from './';

export default React.createClass({
  displayName: 'Selector',

  mixins: [PureRender],

  propTypes: {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })),
    selected: PropTypes.string,
    onChange: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      label: null,
      options: [{name:'-', value: ''}],
      selected: '',
      onChange: function() {},
    };
  },
  hasLabel: function() {
    return !!this.props.label;
  },
  render: function() {
    return (
      <div {...this.props}>
        {this.hasLabel() && <label className='control-label'>{this.props.label}</label>}
        <Select className='form-control'
          options={this.props.options}
          selected={this.props.selected}
          onChange={this.handleChange} />
      </div>
    );
  },

  handleChange: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onChange(e.target.value);
  },

});
