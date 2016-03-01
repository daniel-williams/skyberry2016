import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';


export default React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      label: '',
      value: false,
      onChange: function() {},
    };
  },
  changeValue: function(event) {
      var target = event.currentTarget;
      this.setValue(target.checked);
      this.props.onChange(this.props.name, target.checked);
  },

  render: function() {
    const cssNames = this.showError() ? ' has-error' : '';
    const errorMessage = this.showError() ? <span className='help-block'>{this.getErrorMessage()}</span> : null;

    return (
      <div className={'checkbox' + cssNames}>
        <label>
          <input
            {...this.props}
            type='checkbox'
            name={this.props.name}
            checked={this.getValue() === true}
            disabled={this.isFormDisabled() || this.props.disabled}
            onChange={this.changeValue} /> {this.props.label}
        </label>
        {errorMessage}
      </div>
    );
  }
});
