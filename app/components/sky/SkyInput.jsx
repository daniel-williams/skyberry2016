import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';


export default React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    label: PropTypes.string,
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {
    const className = this.showError() ? 'error' : null;
    const errorMessage = this.showError() ? <span>{this.getErrorMessage()}</span> : null;

    return (
      <div className='form-group'>
        {this.props.label && <label className='control-label'>{this.props.label}</label>}
        <input
          {...this.props}
          type={this.props.type || 'text'}
          name={this.props.name}
          value={this.getValue()}
          onChange={this.changeValue}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null} />
        {errorMessage}
      </div>
    );
  }
});
