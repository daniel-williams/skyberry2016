import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';


export default React.createClass({
  displayName: 'Select',

  mixins: [PureRender],

  propTypes: {
    options: PropTypes.array,
  },
  getDefaultProps: function() {
    return {
      options: [{label: 'choose', value: ''}],
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
    return (
      <select className='form-control sky select'>
        {this.props.options.map((item, i) => <option value={item.value} key={i}>{item.label}</option>)}
      </select>
    );
  },

});
