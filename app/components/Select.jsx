import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';


export default React.createClass({
  displayName: 'Select',

  mixins: [PureRender],

  propTypes: {
    options: PropTypes.array,
    selected: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      options: [{label: 'choose', value: ''}],
      selected: null,
    };
  },
  render: function() {
    return (
      <div {...this.props}>
        {this.renderSelect()}
      </div>
    );
  },
  renderSelect: function() {
    const selected = this.props.selected;
    return (
      <select className='form-control sky select' defaultValue={selected}>
        {this.props.options.map((item, i) => <option value={item.value} key={i}>{item.label}</option>)}
      </select>
    );
  },

});
