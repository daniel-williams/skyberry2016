import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'SkyInput',

  mixins: [Formsy.Mixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      type: 'text',
      value: null,
      onChange: function() {},
    };
  },

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
    this.props.onChange(event);
  },
  // componentWillReceiveProps: function(nextProps) {
  //   if(this.getValue() !== nextProps.value) {
  //     this.setValue('');
  //   }
  // },

  showLabel: function() {
    return !!this.props.label;
  },

  render: function () {
    const groupCssNames = classnames('form-group', this.props.className, {
      'has-error': this.showError(),
    });

    return (
      <div className={groupCssNames}>
        {this.showLabel() && this.renderLabel()}
        <input
          type={this.props.type}
          name={this.props.name}
          value={this.getValue()}
          onChange={this.changeValue}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
          className='form-control'
          required={this.props.required}
        />
        {this.showError() && this.renderErrorMessage()}
      </div>
    );
  },

  renderLabel: function() {
    return (
      <label htmlFor={this.props.name} className='control-label'>{this.props.label}</label>
    );
  },
  renderErrorMessage: function() {
    return (
      <span className='help-block'>{this.getErrorMessage()}</span>
    );
  },

});
