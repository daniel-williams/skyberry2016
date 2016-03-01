import React, {PropTypes} from 'react';
// import Formsy from 'formsy-react';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'SkySelect',

  // mixins: [Formsy.Mixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    selected: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })),
    onChange: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      selected: '',
      label: null,
      options: [{name: 'choose', value: ''}],
      onChange: function() { console.log('WTF'); },
    };
  },

  showLabel: function() {
    return !!this.props.label;
  },

  render: function() {
    const cssNames = classnames('form-group', this.props.className);

    return (
      <div className={cssNames}>
        {this.showLabel() && this.renderLabel()}
        <select
          value={this.props.selected}
          onChange={this.handleChange}
          className='form-control'>
          {
            this.props.options.map(item => {
              return <option value={item.value} key={item.value}>{item.name}</option>
            })
          }
        </select>
      </div>
    );
  },

  renderLabel: function() {
    return (
      <label htmlFor={this.props.name} className='control-label'>{this.props.label}</label>
    );
  },

  handleChange: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onChange(e.target.value);
  },

});
