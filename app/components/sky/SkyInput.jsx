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
    const cssNames = this.showError() ? ' has-error' : '';
    const errorMessage = this.showError() ? <span className='help-block'>{this.getErrorMessage()}</span> : null;

    return (
      <div className={'form-group' + cssNames}>
        {this.props.label && <label className='control-label'>{this.props.label}</label>}
        <input
          {...this.props}
          type={this.props.type || 'text'}
          name={this.props.name}
          value={this.getValue()}
          onChange={this.changeValue} />
        {errorMessage}
      </div>
    );
  }
});
