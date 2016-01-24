import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';


export default React.createClass({
  displayName: 'Select',

  mixins: [PureRender],

  propTypes: {
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })),
    selected: PropTypes.string,
    onChange: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      options: [{name: 'choose', value: ''}],
      selected: null,
      onChange: function() {},
    };
  },
  render: function() {
    return (
      <select {...this.props} defaultValue={this.props.selected} onChange={this.props.onChange}>
        {this.props.options.map((item, i) => <option value={item.value} key={i}>{item.name}</option>)}
      </select>
    );
  },

});
